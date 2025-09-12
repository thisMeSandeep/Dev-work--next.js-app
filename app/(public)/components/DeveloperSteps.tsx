"use client";

import { motion } from "motion/react";
import { UserCheck, Upload, Trophy, Wallet } from "lucide-react";
import Image from "next/image";

const steps = [
    {
        id: 1,
        title: "Create Developer Profile",
        description:
            "Showcase your skills, experience, and portfolio to stand out in front of clients.",
        icon: UserCheck,
        img: "/assets/dev1.svg",
    },
    {
        id: 2,
        title: "Browse & Apply",
        description:
            "Explore jobs posted by global companies and apply to the ones that match your expertise.",
        icon: Upload,
        img: "/assets/dev2.svg",
    },
    {
        id: 3,
        title: "Win Projects",
        description:
            "Collaborate with clients, deliver quality work, and build a reputation that speaks for itself.",
        icon: Trophy,
        img: "/assets/dev3.svg",
    },
    {
        id: 4,
        title: "Get Paid Securely",
        description:
            "Receive payments on time through DevWork’s safe and transparent payment system.",
        icon: Wallet,
        img: "/assets/dev4.svg",
    },
];
export default function DeveloperSteps() {
    return (
        <section className="relative bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
            {/* Floating abstract shapes */}
            <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-30 blur-3xl animate-pulse"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-300 rounded-full opacity-20 blur-3xl animate-pulse"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-5xl font-extrabold">
                        Grow Your Career on <span className="text-emerald-600">DevWork</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Unlock opportunities and build a global career in four simple steps.
                    </p>
                </motion.div>

                {/* Zig-Zag Timeline */}
                <div className="mt-20 relative z-10 flex flex-col lg:flex-row lg:justify-between items-center">
                    {/* Curved path behind cards */}
                    <svg
                        className="absolute inset-0 w-full h-full hidden lg:block z-0"
                        viewBox="0 0 1000 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M100 50 C250 0, 750 0, 900 100 S200 300, 500 350"
                            stroke="#10B981"
                            strokeWidth="6"
                            strokeDasharray="12 8"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {[50, 150, 250, 350].map((y, i) => (
                            <motion.circle
                                key={i}
                                cx={100 + i * 200}
                                cy={y}
                                r="8"
                                fill="#10B981"
                                animate={{ r: [8, 12, 8] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                            />
                        ))}
                    </svg>

                    {/* Cards */}
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.3, duration: 0.6 }}
                            className={`relative flex flex-col items-center z-10 mb-16 lg:mb-0 ${i % 2 === 0 ? "lg:self-start" : "lg:self-end"
                                }`}
                        >
                            {/* Number Badge */}
                            <span className="absolute -left-10 lg:-left-10 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold shadow">
                                {step.id}
                            </span>

                            {/* Image */}
                            <div className="w-full h-48 flex items-center justify-center mb-4">
                                <Image
                                    src={step.img}
                                    alt={step.title}
                                    width={150}
                                    height={150}
                                    className="object-contain rounded-xl"
                                />
                            </div>

                            {/* Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg w-64 lg:w-72 hover:shadow-xl transition-transform transform hover:scale-105">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mb-4 shadow">
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
