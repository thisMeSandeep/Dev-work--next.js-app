"use client";

import Header from "@/components/header/Header";
import WaveLoader from "@/components/loader/WaveLoader";
import { fetchClientJobsAndSet } from "@/lib/fetchClientJobs";
import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/userStore";
import { User } from "lucide-react";
import React, { useEffect } from "react";

const navLinks = [
  { name: "Jobs", path: "/client/jobs" },
  { name: "Post job", path: "/client/post-job" },
  { name: "Requests", path: "/client/requests" },
];

const profileLinks = [
  { label: "Your Profile", icon: User, href: "/client/profile" },
];

const Clientlayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
    fetchClientJobsAndSet();
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <WaveLoader />
      </div>
    );

  const userData = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    role: user?.role ?? "",
    profileImage: user?.profileImage ?? "",
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
