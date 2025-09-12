"use client";

import { testimonials } from "@/data/testimonials";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

function MobileTestimonials() {
    const cardsRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardsRef,
        offset: ["start start", "end end"],
    });

    const totalCards = testimonials.length;
    const scrollLengthPerCard = 80; // scroll length per card

    return (
        <section className="relative block sm:hidden bg-white py-12">
            {/* Heading */}
            <div className="text-center mb-8 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Loved by{" "}
                    <span className="text-emerald-600">Clients & Developers</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Join thousands of professionals thriving with DevWork's innovative platform.
                </p>
            </div>

            {/* Cards scroll wrapper */}
            <div
                ref={cardsRef}
                style={{ height: `${totalCards * scrollLengthPerCard}vh` }}
                className="relative mt-8"
            >
                <div className="sticky top-0 h-screen flex items-center justify-center">
                    {testimonials.map((item, i) => {
                        const start = i / totalCards;
                        const end = (i + 1) / totalCards;

                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [0, 1, 1, 0]
                        );

                        const scale = useTransform(
                            scrollYProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [0.9, 1, 1, 0.9]
                        );

                        const y = useTransform(scrollYProgress, [start, end], ["20%", "0%"]);

                        return (
                            <motion.div
                                key={i}
                                style={{ y, opacity, scale }}
                                className="absolute w-[88vw] max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-5 flex flex-col border border-emerald-100"
                            >
                                {/* Quote icon header */}
                                <div className="flex justify-between items-center mb-3">
                                    <Quote className="w-6 h-6 text-emerald-500 opacity-70" />
                                </div>

                                {/* Profile */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-sm"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                </div>

                                {/* Testimonial text */}
                                <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-6">
                                    {item.text}
                                </p>

                                {/* Decorative gradient footer strip */}
                                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default MobileTestimonials;
