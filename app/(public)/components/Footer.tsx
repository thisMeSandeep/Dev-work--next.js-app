"use client";

import { motion } from "motion/react";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-gray-200">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:pt-20 lg:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-white">DevWork</h2>
                        <p className="mt-3 text-sm text-emerald-100 leading-relaxed">
                            Connecting world-class developers with ambitious companies.
                            Empowering careers, building products, fueling innovation.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-semibold text-white">Explore</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link href="/clients" className="hover:text-emerald-300 transition">
                                    For Clients
                                </Link>
                            </li>
                            <li>
                                <Link href="/developers" className="hover:text-emerald-300 transition">
                                    For Developers
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-emerald-300 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-emerald-300 transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
                        <p className="mt-3 text-sm text-emerald-100">
                            Get the latest news, job postings, and product updates.
                        </p>
                        <form className="mt-4 flex items-center bg-white/10 rounded-lg overflow-hidden">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-3 py-2 bg-transparent text-sm text-white placeholder-emerald-200 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 transition text-white text-sm font-semibold"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col"
                    >
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <div className="mt-4 flex gap-4">
                            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-full bg-white/10 hover:bg-emerald-500 transition"
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

        
                {/* Bottom Bar */}
                <div className="mt-6 border-t border-emerald-700 py-3 flex flex-col md:flex-row items-center justify-between text-sm text-emerald-200">
                    <p>© {new Date().getFullYear()} DevWork. All rights reserved.</p>
                    <p className="mt-3 md:mt-0">Made with ❤️ in India</p>
                </div>
            </div>
        </footer>
    );
}
