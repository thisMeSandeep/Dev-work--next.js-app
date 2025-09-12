"use client";

import { motion } from "motion/react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Product Manager, Google",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "DevWork has transformed how we hire developers. The quality and speed are unmatched. We onboarded a React expert in just 48 hours!",
        span: { col: 2, row: 2 },
    },
    {
        name: "Arjun Mehta",
        role: "Founder, StartupHub",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "As a founder, I value speed and trust. DevWork helped us scale our team with top-notch developers seamlessly.",
        span: { col: 1, row: 1 },
    },
    {
        name: "Emily Carter",
        role: "CTO, FinEdge",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "I was amazed by how easy it was to find vetted developers. The entire process felt effortless yet highly professional.",
        span: { col: 1, row: 2 },
    },
    {
        name: "Daniel Lee",
        role: "Engineering Lead, Microsoft",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        text: "We’ve hired multiple engineers through DevWork, and every single one has exceeded expectations. A real game-changer.",
        span: { col: 2, row: 1 },
    },
    {
        name: "Priya Verma",
        role: "Fullstack Developer, Freelancer",
        image: "https://randomuser.me/api/portraits/women/23.jpg",
        text: "Joining DevWork opened global opportunities for me. Clients are genuine, and projects align with my skills perfectly.",
        span: { col: 1, row: 1 },
    },
    {
        name: "James Brown",
        role: "Tech Recruiter, Amazon",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
        text: "The efficiency and reliability of DevWork is unmatched. We found specialized developers without wasting weeks on hiring.",
        span: { col: 1, row: 1 },
    },
    {
        name: "Aisha Khan",
        role: "Backend Engineer, Stripe",
        image: "https://randomuser.me/api/portraits/women/11.jpg",
        text: "DevWork empowers developers with opportunities that actually matter. I love the seamless workflow from proposals to contracts.",
        span: { col: 1, row: 1 },
    },
    {
        name: "Michael Ross",
        role: "Founder, SaaSify",
        image: "https://randomuser.me/api/portraits/men/29.jpg",
        text: "As a startup founder, speed is everything. DevWork gave us a vetted dev team in under a week. Unreal experience.",
        span: { col: 2, row: 1 },
    },
    {
        name: "Lina Patel",
        role: "UI/UX Designer, Adobe",
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        text: "DevWork made it simple to connect with innovative projects. The platform’s design focus is a huge plus for creatives like me.",
        span: { col: 1, row: 1 },
    },
];

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px, auto)]">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`rounded-2xl bg-emerald-50/90 backdrop-blur-sm shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:scale-105 transition duration-300 ease-in-out
                            ${item.span.col === 2 ? "col-span-2" : "col-span-1"}
                            ${item.span.row === 2 ? "row-span-2" : "row-span-1"}`}
                        >
                            <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover border-2 border-emerald-400 shadow-sm"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                                    <p className="text-sm text-gray-500 leading-tight">{item.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 text-base leading-relaxed relative flex-grow overflow-hidden line-clamp-3">
                                <span className="absolute -top-1 -left-1 text-emerald-400 text-2xl opacity-60">“</span>
                                {item.text}
                                <span className="absolute -bottom-1 -right-1 text-emerald-400 text-2xl opacity-60">”</span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}