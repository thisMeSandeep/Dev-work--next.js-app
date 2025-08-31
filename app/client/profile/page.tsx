"use client";

import ProfileUpload from "@/components/profileUpload/ProfileUpload";
import { useUserStore } from "@/store/userStore";
import { MapPin } from "lucide-react";
import React from "react";
import CreateClientProfileForm from "../components/CreateClientProfileForm";
import { ClientStatsCard } from "../components/ClientStatesCard";
import { Job } from "@/types/type";

// Define types for user & client profile
interface ClientProfileType {
  mobile?: string | null;
  company?: string | null;
  websiteLink?: string | null;
  postedJobs?: Job[]; 
  rating?: number | null;
}

interface UserType {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  profileImage?: string;
  ClientProfile?: ClientProfileType;
}

const ClientProfile: React.FC = () => {
  const user = useUserStore((state) => state.user) as UserType;

  // extract text placeholder safely
  const textPlaceholder =
    (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  const clientFormData = {
    country: user?.country ?? "",
    mobile: user?.ClientProfile?.mobile ?? "",
    company: user?.ClientProfile?.company ?? "",
    websiteLink: user?.ClientProfile?.websiteLink ?? "",
  };

  const clientData = {
    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
    email: user?.email ?? "",
    jobsPosted: user?.ClientProfile?.postedJobs?.length ?? 0,
    totalSpent: 0, 
    proposals: 0, 
    rating: user?.ClientProfile?.rating ?? 0,
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
              {clientData.name}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
              <MapPin className="size-5 text-green-500" />
              {user?.country ?? "Not set"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* form to update data */}
      <div>
        <CreateClientProfileForm initialData={clientFormData} />
      </div>

      <hr />

      {/* client states card */}
      <ClientStatsCard {...clientData} />
    </div>
  );
};

export default ClientProfile;
