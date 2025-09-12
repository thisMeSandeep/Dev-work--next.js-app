"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const stats = [
    { label: "Jobs Posted", value: 12500, suffix: "+" },
    { label: "Developers Joined", value: 8500, suffix: "+" },
    { label: "Earnings Paid", value: 3200000, suffix: "$" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000; // ms
            const stepTime = 20;
            const increment = end / (duration / stepTime);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setCount(Math.floor(start));
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function Cto() {
    return (
        <section className="relative overflow-hidden text-white">
            {/* Background gradient + subtle radial pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.2)_1px,transparent_0)] bg-[length:28px_28px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Numbers that <span className="text-emerald-300">Speak for Themselves</span>
                    </h2>
                    <p className="mt-3 text-lg text-emerald-100 max-w-2xl mx-auto">
                        DevWork is more than a platform—it’s a movement that empowers businesses and developers alike.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition-transform"
                        >
                            <p className="text-4xl md:text-5xl font-bold text-emerald-300 drop-shadow-sm">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="mt-3 text-lg font-medium text-emerald-100">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="/signup"
                        className="inline-block px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105"
                    >
                        Join DevWork Today
                    </a>
                    <p className="mt-4 text-emerald-200">
                        Start building your future—whether hiring talent or finding opportunities.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
