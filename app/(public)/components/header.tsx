"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all ${
        scrolled ? "border-b border-gray-200 " : ""
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="w-28 h-8 relative flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            height={32}
            width={112}
            priority
            className="size-full object-contain"
          />
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="text-sm font-semibold bg-green-600 px-6 md:px-10 py-2 rounded-full text-white shadow-sm hover:bg-green-500 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
