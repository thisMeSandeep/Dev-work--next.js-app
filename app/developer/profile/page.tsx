"use client";

import { useState } from "react";
import ProfileUpload from "@/components/profileUpload/ProfileUpload";
import { useUserStore } from "@/store/userStore";
import { MapPin, Pencil, X } from "lucide-react";
import React from "react";
import DeveloperProfileDisplay from "../components/DeveloperProfileDisplay";
import DeveloperProfileForm from "../components/DeveloperProfileForm";
import { FreelancerProfile } from "@/types/type";

const DeveloperProfile = () => {
  const user = useUserStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  // extract text placeholder safely
  const textPlaceholder =
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

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

        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-green-700 hover:text-green-500 border-2 border-green-700 rounded-full p-3 cursor-pointer transition-colors"
        >
          {isEditing ? (
            <>
              <X className="h-5 w-5" />
              <span className="hidden sm:inline">Cancel</span>
            </>
          ) : (
            <>
              <Pencil className="h-5 w-5" />
              <span className="hidden sm:inline">Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <div className="border border-black">
        {/* Conditional Rendering */}
        {isEditing ? (
          <DeveloperProfileForm
            profile={user?.FreelancerProfile as FreelancerProfile}
            country={user?.country ?? ""}
            onSuccess={handleEditSuccess}
          />
        ) : (
          <DeveloperProfileDisplay
            profile={user?.FreelancerProfile as FreelancerProfile}
          />
        )}
      </div>
    </div>
  );
};

export default DeveloperProfile;
