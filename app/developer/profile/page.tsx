"use client";

import { useState } from "react";
import ProfileUpload from "@/components/profileUpload/ProfileUpload";
import { useUserStore } from "@/store/userStore";
import { MapPin, Pencil, X } from "lucide-react";
import React from "react";
import DeveloperProfileDisplay from "../components/DeveloperProfileDisplay";
import DeveloperProfileForm from "../components/DeveloperProfileForm";
import { Category, ExperienceLevel, Speciality } from "@/generated/prisma";

const DeveloperProfile = () => {
  const user = useUserStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  // extract text placeholder safely
  const textPlaceholder =
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  // Mock profile data - replace with actual data from your API/database
  const mockProfile = {
    available: true,
    mobile: "+91 9876543210",
    bio: "I'm a skilled full stack developer with expertise in React, Node.js, and modern web technologies.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    category: Category.SOFTWARE_DEV,
    speciality: Speciality.AI_CHATBOT,
    experienceLevel: ExperienceLevel.INTERMEDIATE,
    perHourRate: 25,
    languages: "English, Hindi",
    portfolioLink: "https://myportfolio.com",
    otherLink: "https://linkedin.com/in/username",
    file: "/path/to/resume.pdf",
  };

  const handleEditSuccess = () => {
    // Close edit mode after successful submission
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

      {/* Conditional Rendering */}
      {isEditing ? (
        <DeveloperProfileForm
          profile={mockProfile}
          onSuccess={handleEditSuccess}
        />
      ) : (
        <DeveloperProfileDisplay profile={mockProfile} />
      )}
    </div>
  );
};

export default DeveloperProfile;
