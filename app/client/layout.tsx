"use client";

import Header from "@/components/header/Header";
import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/userStore";
import { User } from "lucide-react";
import React, { useEffect } from "react";

const navLinks = [
  { name: "Jobs", path: "/client/jobs" },
  { name: "Proposals", path: "/client/proposals" },
  { name: "Requests", path: "/client/requests" },
];

const profileLinks = [
  { label: "Your Profile", icon: User, href: "/client/profile" },
];

const Clientlayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  const userData = {
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    role: user.role as string,
    profileImage: user.profileImage as string,
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

export default Clientlayout;
