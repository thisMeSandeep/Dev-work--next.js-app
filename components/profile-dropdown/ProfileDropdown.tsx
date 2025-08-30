"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";

export type DropdownLink = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
};

type ProfileDropdownProps = {
  name: string;
  role: string;
  avatarText: string;
  profileImage?: string;
  links: DropdownLink[];
};

export default function ProfileDropdown({
  name,
  role,
  avatarText,
  profileImage,
  links,
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler (your custom logic here)
  const handleLogout = async () => {
    console.log("Logout clicked");
    setOpen(false);
    // TODO: clear auth tokens, reset user store, redirect to login, etc.
  };

  return (
    <div className="relative " ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 text-sm font-medium hover:border-green-500 transition-colors overflow-hidden cursor-pointer"
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt="profile"
            fill
            className="object-cover rounded-full"
          />
        ) : (
          avatarText
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 font-semibold overflow-hidden">
              {profileImage ? (
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="profile"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              ) : (
                avatarText
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left w-full border-t border-gray-100"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
