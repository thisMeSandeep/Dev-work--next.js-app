"use client";

import { useState } from "react";
import { Bell, HelpCircle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import ProfileDropdown, {
  DropdownLink,
} from "../profile-dropdown/ProfileDropdown";

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
    <header className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-black/10 bg-white">
      {/* Left: menu toggle + logo + desktop nav */}
      <div className="flex items-center gap-4">
        {/* Mobile toggle */}
        <button
          aria-label="Toggle navigation"
          className="sm:hidden text-gray-700 hover:text-green-600 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="text-lg font-semibold text-green-600">DevWork</div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6">
          {navItems.map((nav) => (
            <Link
              key={nav.name}
              href={nav.path}
              className="text-sm text-gray-700 transition-colors hover:text-green-600"
            >
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-6">
        <button
          aria-label="Help"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <HelpCircle size={20} />
        </button>
        <button
          aria-label="Notifications"
          className="text-gray-700 hover:text-green-600 transition-colors"
        >
          <Bell size={20} />
        </button>

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

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl sm:hidden flex flex-col p-6"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-semibold text-green-600">
                  DevWork
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-green-600"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Nav */}
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Optional: profile links inside drawer */}
              {profileLinks.length > 0 && (
                <div className="mt-6 border-t border-black/10 pt-4">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block py-2 text-sm text-gray-600 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
