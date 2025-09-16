"use client"

import { AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/router";

const ErrorPage = ({ message }: { message?: string }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ type: "spring", stiffness: 200, damping: 10, duration: 0.6 }}
                className="mb-8 p-8 bg-red-100 rounded-full"
            >
                <AlertCircle className="text-red-600 w-16 h-16" />
            </motion.div>
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800 mb-4"
            >
                Oops! Something went wrong.
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6 max-w-md"
            >
                {message || "We’re sorry — an unexpected error occurred. Please try again later or go back."}
            </motion.p>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
                </button>
            </motion.div>
        </div>
    );
};

export default ErrorPage;