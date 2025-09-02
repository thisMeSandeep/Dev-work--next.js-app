"use client";

import { Heart, MapPin } from "lucide-react";
import { Job } from "@/types/type";
import SkillSlider from "./SkillsSlider";

interface WorkCardProps {
  job: Job;
}

const WorkCard = ({ job }: WorkCardProps) => {
  return (
    <div className="group border-b border-b-gray-300 pb-2">
      <p className="text-sm text-gray-600">
        {new Date(job.createdAt).toLocaleDateString()}
      </p>

      {/* title */}
      <div className="flex items-start justify-between gap-10">
        <h3 className="text-xl text-gray-900 group-hover:text-green-600">
          {job.title}
        </h3>
        <button>
          <Heart className="size-5 cursor-pointer hover:text-green-700 hover:scale-105" />
        </button>
      </div>

      <p className="mt-3 text-gray-500 text-sm">
        {job.category} • {job.experienceRequired} • ${job.budget}
      </p>

      {/* description */}
      <p className="text-gray-700 mt-5 font-light">{job.description}</p>

      {/* skill slider */}
      <SkillSlider skills={job.skills} />

      {/* client info */}
      <div className="mt-4 text-gray-500 flex items-center gap-5">
        <span>
          Client: {job.client.user.firstName} {job.client.user.lastName}
        </span>
        <span>Status: {job.status.toLowerCase()}</span>
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> {job.client.user.country}
        </span>
      </div>

      {/* no. of proposals */}
      <p className="mt-4 text-gray-500 font-light">
        Proposals: <span className="font-normal">{job.numberOfProposals}</span>
      </p>
    </div>
  );
};

export default WorkCard;
