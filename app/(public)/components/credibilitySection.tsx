"use client";

import { motion } from "motion/react";
import { Briefcase, Globe2, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CredibilitySection() {
    return (
        <section className="relative bg-gray-50 text-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-24">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left"
                >
                    <p className="text-sm font-semibold text-emerald-600">Trusted by Professionals</p>
                    <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                        Join Leading Companies <br className="hidden sm:block" /> on DevWork
                    </h2>
                    <p className="max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
                        DevWork connects startups, enterprises, and freelancers in a single
                        marketplace. Build your dream team, find the right projects, and
                        collaborate with confidence—backed by modern tools and a trusted
                        community.
                    </p>

                    {/* Features */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="flex flex-col items-center gap-3 sm:items-start">
                            <Briefcase className="h-8 w-8 text-emerald-600" />
                            <h3 className="text-lg font-semibold">Top Talent</h3>
                            <p className="text-sm text-gray-600">
                                Access vetted professionals across development, design, and marketing.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:items-start">
                            <Globe2 className="h-8 w-8 text-emerald-600" />
                            <h3 className="text-lg font-semibold">Global Reach</h3>
                            <p className="text-sm text-gray-600">
                                Collaborate seamlessly with freelancers and companies worldwide.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:items-start">
                            <Users className="h-8 w-8 text-emerald-600" />
                            <h3 className="text-lg font-semibold">Community Driven</h3>
                            <p className="text-sm text-gray-600">
                                Grow within a trusted network of professionals who value quality and collaboration.
                            </p>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center justify-center lg:justify-start">
                        <Link href="/signup" className="w-full sm:w-auto ">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-500 cursor-pointer"
                            >
                                Explore DevWork
                            </motion.button>
                        </Link>

                        <Link href="/signin" className="w-full sm:w-auto ">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-emerald-700 font-semibold cursor-pointer"
                            >
                                Learn More →
                            </motion.button>
                        </Link>
                    </div>

                </motion.div>

                {/* Right Image  */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="col-span-5 mt-12 flex justify-center lg:mt-0"
                >
                    <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px]">
                        <Image
                            src="/assets/handshake.jpeg"
                            alt="Team collaboration on DevWork"
                            width={480}
                            height={480}
                            priority
                            sizes="(max-width: 640px) 280px,
                           (max-width: 768px) 360px,
                           (max-width: 1024px) 420px,
                           480px"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
