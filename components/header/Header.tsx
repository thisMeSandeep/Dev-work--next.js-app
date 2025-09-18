"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import ProfileDropdown, {
  DropdownLink,
} from "../profile-dropdown/ProfileDropdown";
import Image from "next/image";

interface NavItem {
  name: string;
  path: string;
}
interface UserType {
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
}
interface HeaderProps {
  navItems: NavItem[];
  profileLinks: DropdownLink[];
  user: UserType;
}

export default function Header({ navItems, profileLinks, user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white/90 backdrop-blur-md">
      {/* Left: menu toggle + logo + desktop nav */}
      <div className="flex items-center gap-4 sm:gap-12">
        {/* Mobile toggle */}
        <button
          aria-label="Toggle navigation"
          className="sm:hidden text-gray-800 hover:text-green-600 transition-all duration-200 hover:scale-105 p-2 hover:bg-gray-100 rounded-lg relative z-60"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X size={24} className="text-gray-800 font-bold stroke-2" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </motion.div>
        </button>

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

        {/* Desktop Nav with increased spacing */}
        <nav className="hidden sm:flex gap-8 ml-4">
          {navItems.map((nav, index) => (
            <motion.div
              key={nav.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={nav.path}
                className="text-sm font-medium text-gray-700 transition-all duration-200 hover:text-green-600 hover:scale-105 relative group"
              >
                {nav.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-6">
        {user && profileLinks.length > 0 && (
          <ProfileDropdown
            name={`${user.firstName} ${user.lastName}`}
            role={user.role}
            avatarText={`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
            profileImage={user.profileImage}
            links={profileLinks}
          />
        )}
      </div>

      {/* Modern Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Modern Slide-in Menu */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.3
              }}
              className="fixed top-24 left-4 right-4 z-60 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl sm:hidden overflow-hidden"
            >
              {/* Modern Nav Items */}
              <div className="p-6">
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Link
                        href={item.path}
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/50 rounded-xl transition-all duration-200 font-medium group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Profile links with modern styling */}
                {profileLinks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.05 + 0.1 }}
                    className="mt-6 pt-4 border-t border-gray-200/50"
                  >
                    <div className="space-y-1">
                      {profileLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (navItems.length + index) * 0.05 + 0.15,
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                          }}
                        >
                          <Link
                            href={link.href}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50/30 rounded-lg transition-all duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Subtle bottom accent */}
              <div className="h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-500"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}