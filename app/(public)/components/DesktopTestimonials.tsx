"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export default function DesktopTestimonials() {
    return (
        <section className="relative bg-white text-gray-900 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.4)_1px,transparent_0)] bg-[length:28px_28px] hidden sm:block">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32 relative">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Loved by <span className="text-emerald-600">Clients & Developers</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of professionals thriving with DevWork's innovative platform.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px, auto)]">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-2xl bg-white/80 backdrop-blur-md shadow-xl p-6 flex flex-col border border-emerald-100 hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out
                            ${item.span.col === 2 ? "col-span-2" : "col-span-1"}
                            ${item.span.row === 2 ? "row-span-2" : "row-span-1"}`}
                        >
                            {/* Background Quote watermark */}
                            <Quote className="absolute top-4 right-4 size-10 text-emerald-400  pointer-events-none" />

                            {/* Profile */}
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                    unoptimized
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
                            <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-5 flex-grow relative z-10">
                                {item.text}
                            </p>

                            {/* Decorative gradient footer strip */}
                            <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 mt-auto relative z-10" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
