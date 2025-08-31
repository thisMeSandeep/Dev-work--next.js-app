"use client";

import Header from "@/components/header/Header";
import WaveLoader from "@/components/loader/WaveLoader";
import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/userStore";
import { Settings, User } from "lucide-react";
import React, { useEffect } from "react";

const navLinks = [
  { name: "Find work", path: "/developer" },
  { name: "Saved Jobs", path: "/developer/saved-jobs" },
  { name: "Proposals", path: "/developer/proposals" },
];

const profileLinks = [
  { label: "Your Profile", icon: User, href: "/developer/profile" },
  {
    label: "Account Settings",
    icon: Settings,
    href: "/developer/account-settings",
  },
];

const Developerlayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <WaveLoader />
      </div>
    );

  const userData = {
    firstName: user?.firstName!,
    lastName: user?.lastName!,
    role: user?.role!,
    profileImage: user?.profileImage!,
  };

  return (
    <div>
      <div>
        <Header
          navItems={navLinks}
          profileLinks={profileLinks}
          user={userData}
        />
        {children}
      </div>
    </div>
  );
};

export default Developerlayout;
