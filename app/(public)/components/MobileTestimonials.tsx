"use client";

import { testimonials } from "@/data/testimonials";
import { motion } from "motion/react";
import { useState } from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  image: string;
};

interface TestimonialCardProps {
  item: Testimonial;
  index: number;
}

function TestimonialCard({ item, index }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-xl p-6 mx-4 border border-emerald-100">
      {/* Quote icon header */}
      <div className="flex justify-between items-center mb-4">
        <Quote className="w-6 h-6 text-emerald-500 opacity-70" />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={item.image}
          alt={item.name}
          width={56}
          height={56}
          unoptimized
          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400 shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.role}</p>
        </div>
      </div>

      {/* Testimonial text */}
      <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-6">
        {item.text}
      </p>

      {/* Decorative gradient footer strip */}
      <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
    </div>
  );
}

function MobileTestimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Calculate total width needed for animation
  const cardWidth = 320; // 80 * 4 (w-80 = 320px) + margins
  const totalWidth = testimonials.length * cardWidth;

  return (
    <section className="relative block sm:hidden bg-white py-12 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Loved by{" "}
          <span className="text-emerald-600">Clients & Developers</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of professionals thriving with DevWork&apos;s
          innovative platform.
        </p>
      </div>

      {/* Fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="relative">
        <motion.div
          className="flex"
          animate={{
            x: isPaused ? undefined : [-totalWidth, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: testimonials.length * 4, // 4 seconds per testimonial
              ease: "linear",
            },
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {duplicatedTestimonials.map((item, index) => (
            <TestimonialCard
              key={`${index}-${item.name}`}
              item={item as Testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MobileTestimonials;
