
"use client";

import { motion } from "motion/react";

const dots = [0, 1, 2]; //dots

export default function WaveLoader() {
  return (
    <div className="flex justify-center items-center h-full gap-2">
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className="size-2 bg-green-500 rounded-full"
          animate={{
            y: ["0%", "-50%", "0%"], 
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.1, 
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
