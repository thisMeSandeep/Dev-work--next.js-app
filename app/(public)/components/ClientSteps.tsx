"use client";

import { motion } from "motion/react";
import Image from "next/image";

const steps = [
    {
        id: 1,
        title: "Create Client Account",
        description: "Sign up in minutes and set up your profile to start hiring top talent.",
        img: "/assets/client1.svg",
    },
    {
        id: 2,
        title: "Post Jobs",
        description: "Describe your project and instantly reach developers worldwide.",
        img: "/assets/client2.svg",
    },
    {
        id: 3,
        title: "Accept Proposals",
        description: "Review tailored proposals from skilled developers ready to collaborate.",
        img: "/assets/client3.svg",
    },
    {
        id: 4,
        title: "Send Requests",
        description: "Invite the most relevant developers to kickstart your project quickly.",
        img: "/assets/client4.svg",
    },
];

export default function ClientSteps() {
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-5xl font-extrabold">
                        Hire Developers in{" "}
                        <span className="text-emerald-600">4 Easy Steps</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        A modern hiring journey, beautifully visualized.
                    </p>
                </motion.div>

                {/* SVG Curved Path with moving dots */}
                <svg
                    className="absolute w-full h-32 lg:h-40 top-1/2 left-0 hidden lg:block"
                    viewBox="0 0 1000 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M 50 50 C 200 0, 400 100, 600 50 S 950 50, 950 50"
                        stroke="#059669"
                        strokeWidth="3"
                        strokeDasharray="8 8"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    {/* Moving dots along the path */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="5"
                        fill="#059669"
                        animate={{ cx: [50, 950] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                </svg>

                <div className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            <div className="w-full h-48 flex items-center justify-center mb-6">
                                <Image
                                    src={step.img}
                                    alt={step.title}
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-gray-600 text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
