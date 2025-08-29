"use client"

import { fetchAndSetUser } from "@/lib/fetchUser";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";

const Clientlayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      Header will come here
      {children}
    </div>
  );
};

export default Clientlayout;
