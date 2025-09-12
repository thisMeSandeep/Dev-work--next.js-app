"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
            {/* Background Accents */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-700/30 rounded-full blur-3xl" />
            <div className="absolute top-40 -right-40 w-[28rem] h-[28rem] bg-emerald-600/20 rounded-full blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 md:py-28 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-32">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="col-span-7 flex flex-col items-start justify-center space-y-6 text-center lg:text-left"
                >
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        Find Work. Hire Talent.
                        <span className="block text-emerald-400">All in one platform.</span>
                    </h1>
                    <p className="max-w-2xl text-base text-emerald-100 sm:text-lg md:text-xl">
                        DevWork is the modern freelance marketplace for developers and clients.
                        Connect with top talent, showcase your skills, and collaborate on projects that matter.
                        Built for speed, trust, and growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                        <Link href="/get-started">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 shadow-lg transition hover:bg-emerald-400"
                            >
                                Get Started
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>

                        <Link href="/explore">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="rounded-2xl border border-emerald-400/60 px-6 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-800/40"
                            >
                                Explore Projects
                            </motion.button>
                        </Link>
                    </div>

                    {/* Social proof / tagline */}
                    <div className="mt-6 flex items-center justify-center lg:justify-start gap-3 text-sm text-emerald-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        Trusted by 5,000+ developers & growing
                    </div>
                </motion.div>

                {/* Visual / Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                    className="col-span-5 mt-12 flex justify-center lg:mt-0"
                >
                    <div className="relative w-[280px] sm:w-[360px] md:w-[420px] lg:w-[480px]">
                        <img
                            src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"
                            alt="Freelancers collaborating on DevWork"
                            className="rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] hover:rotate-1"
                        />
                        {/* Glass overlay accent */}
                        <div className="absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl bg-white/10 px-4 sm:px-6 py-3 backdrop-blur-md shadow-lg">
                            <p className="text-xs sm:text-sm font-semibold text-emerald-200">
                                Empowering freelancers worldwide
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
