"use client"

import ProfileUpload from "@/components/profileUpload/ProfileUpload";
import { useUserStore } from "@/store/userStore";
import { MapPin } from "lucide-react";
import React from "react";

const ClientProfile = () => {
  const user = useUserStore((state) => state.user) as any;

  // extract text placeholder
  const textPlaceholder = (user?.firstName[0]  + user.lastName[0]).toUpperCase();

  return (
    <div>

      {/* profile image and name */}
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between border rounded-md px-4 py-4 sm:py-2 mb-10 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <ProfileUpload
            textPlaceholder={textPlaceholder}
            imageUrl={user?.profileImage as string}
          />
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
              <MapPin className="size-5 text-green-500" />
              {user?.country} 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
