"use client";

import ProfileUpload from "@/components/profileUpload/ProfileUpload";
import { useUserStore } from "@/store/userStore";
import { MapPin } from "lucide-react";
import React from "react";

const DeveloperProfile = () => {
  const user = useUserStore((state) => state.user);

  // extract text placeholder safely
  const textPlaceholder =
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-10 space-y-5">
        
      {/* profile image and name */}
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:py-2 mb-10 gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <ProfileUpload
            textPlaceholder={textPlaceholder.toUpperCase()}
            imageUrl={user?.profileImage ?? ""}
          />
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-2xl sm:text-3xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
              <MapPin className="size-5 text-green-500" />
              {user?.country ?? "Not set"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
