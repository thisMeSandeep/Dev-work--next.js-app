"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const companies = [
    { name: "Google", logo: "/logos/google.svg" },
    { name: "Microsoft", logo: "/logos/microsoft.svg" },
    { name: "Amazon", logo: "/logos/amazon.svg" },
    { name: "Netflix", logo: "/logos/netflix.svg" },
    { name: "Adobe", logo: "/logos/adobe.svg" },
    { name: "Stripe", logo: "/logos/stripe.svg" },
];

export default function CompaniesShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="relative bg-gradient-to-r from-emerald-200 via-emerald-50 to-teal-100 text-gray-800 overflow-hidden">
            {/*  background pattern */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100%] lg:w-[80%] h-full pointer-events-none">
                <div
                    className="w-full h-full bg-no-repeat"
                    style={{
                        backgroundImage: `
        repeating-linear-gradient(to right, rgba(16,185,129,0.25) 0, rgba(16,185,129,0.25) 1px, transparent 1px, transparent 60px),
        repeating-linear-gradient(to bottom, rgba(16,185,129,0.25) 0, rgba(16,185,129,0.25) 1px, transparent 1px, transparent 60px)
      `,
                        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                        maskRepeat: "no-repeat",
                        maskSize: "100% 100%",
                    }}
                ></div>
            </div>



            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Trusted by{" "}
                        <span className="text-emerald-600 drop-shadow-lg">
                            Leading Companies
                        </span>
                    </motion.h2>
                    <motion.p
                        className="mt-3 text-gray-700 text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Top organizations across industries rely on DevWork to connect with world-class developers.
                    </motion.p>
                </motion.div>

                {/* Logos Grid */}
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-12 items-center"
                >
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.name}
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 120,
                                damping: 10,
                            }}
                            className="group flex justify-center cursor-grab active:cursor-grabbing"
                            drag
                            dragConstraints={containerRef}
                            dragElastic={0.2}
                            whileHover={{
                                scale: 1.2,
                                rotate: [0, 5, -5, 0],
                                transition: { duration: 0.6, repeat: 1 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            dragTransition={{
                                bounceStiffness: 600,
                                bounceDamping: 10
                            }}
                        >
                            {/* Logo container */}
                            <div className="relative p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-lg group-hover:bg-white/50 transition-all duration-300">
                                <Image
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    width={140}
                                    height={60}
                                    className="object-contain max-h-12 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    draggable="false"
                                    loading="lazy"
                                />

                                {/* Tooltip */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: -5 }}
                                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
                                >
                                    {company.name}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional context */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 text-sm">
                        Join hundreds of companies that trust DevWork for their development needs
                    </p>
                </motion.div>
            </div>
        </section>
    );
}