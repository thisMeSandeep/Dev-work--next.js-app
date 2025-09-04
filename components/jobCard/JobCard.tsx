"use client";

import { Heart, Loader2, MapPin } from "lucide-react";
import { motion, Variants } from "motion/react";
import SkillSlider from "./SkillsSlider";
import { JobDTO } from "@/types/customtypes";
import { formatString } from "@/lib/formatString";
import { useSaveJob } from "@/hooks/useSaveJob";
import toast from "react-hot-toast";

interface JobCardProps {
  job: JobDTO;
  onClick: (id: string) => void;
  index?: number; // staggered reveal
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { duration: 0.45, ease: "easeOut" },
      y: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
      scale: { duration: 0.35, ease: "easeOut" },
    },
  }),
};

const WorkCard = ({ job, onClick, index = 0 }: JobCardProps) => {
  const { saveJob, loading } = useSaveJob();

  // handle save job action
  const handleSaveJob = async () => {
    const response = await saveJob(job.id);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      custom={index}
    >
      <div className="w-full text-left group  p-2 sm:p-5 bg-white transition-all duration-300 ease-in-out hover:scale-[1.02] ">
        {/* date */}
        <p className="text-sm text-gray-500">
          {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {/* title + save button */}
        <div className="flex items-start justify-between gap-4 mt-2">
          <button
            onClick={() => onClick(job.id)}
            className="text-xl text-left underline font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-600 cursor-pointer"
          >
            {job.title}
          </button>

          {/* save button */}
          {loading ? (
            <div className="p-1.5 rounded-full">
              <Loader2 className="h-5 w-5 animate-spin text-green-700" />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSaveJob}
              aria-label="Save job"
              className="p-1.5 rounded-full hover:bg-green-50 transition-colors duration-200 cursor-pointer"
            >
              <Heart className="h-5 w-5 text-gray-500 group-hover:text-green-700 transition-transform duration-200 group-hover:scale-110" />
            </button>
          )}
        </div>

        {/* meta */}
        <p className="mt-3 text-gray-500 text-sm">
          {formatString(job.category)} • {job.experienceRequired} • $
          {job.budget}
        </p>

        {/* description */}
        <p className="text-gray-800 mt-3 text-sm sm:text-base md:text-[15px] leading-6 md:leading-7 font-normal tracking-wide line-clamp-3">
          {job.description}
        </p>

        {/* skills */}
        <div className="mt-4">
          <SkillSlider skills={job.skills} />
        </div>

        {/* client info */}
        <div className="mt-5 text-gray-500 flex items-center gap-6 text-sm">
          <span>
            <span className="font-medium">Client:</span>{" "}
            {job.client.user.firstName} {job.client.user.lastName}
          </span>

          <span>
            <span className="font-medium">Status:</span>{" "}
            {job.status.toLowerCase()}
          </span>

          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-green-600" />{" "}
            {job.client.user.country}
          </span>
        </div>

        {/* proposals */}
        <p className="mt-5 text-gray-500 font-light">
          Proposals:{" "}
          <span className="font-medium text-gray-800">
            {job.numberOfProposals}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default WorkCard;
