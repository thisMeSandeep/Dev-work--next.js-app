"use client";

import Drawer from "@/components/reusable/Drawer";
import { useUserStore } from "@/store/userStore";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import CreateJobForm from "../components/CreateJobForm";
import { Job } from "@/types/type";

const PostedJobs = () => {
  const [openModel, setOpenModel] = useState(false);

  const user = useUserStore((state) => state.user) as Record<string, unknown>;

  return (
    <div className="max-w-7xl mx-auto py-5  px-4 md:px-10">
      {/* create job button */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => setOpenModel(true)}
          className="flex items-center gap-2 text-green-600 font-semibold hover:underline underline-offset-4 cursor-pointer transition-colors"
        >
          <Briefcase className="h-5 w-5 stroke-[2.5]" />
          <span className="text-sm">Post a Job</span>
        </button>
      </div>

      {/* Show empty jobs area */}
      <div className="flex items-center justify-center min-h-[60vh]">
        {(user.ClientProfile as { postedJobs?: Job[] })?.postedJobs?.length ===
        0 ? (
          <div className="flex flex-col items-center text-center space-y-3 text-gray-600">
            <Briefcase className="h-12 w-12 text-green-600" />
            <p className="text-lg font-medium">No jobs posted yet</p>
            <p className="text-sm text-gray-500">
              Start by creating your first job and connect with freelancers.
            </p>
            <button
              onClick={() => setOpenModel(true)}
              className="text-green-600 font-medium hover:underline cursor-pointer"
            >
              Post a job →
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto text-center text-gray-500">
            {/* ✅ Placeholder for job list */}
            <p className="italic">[ Job list will appear here ]</p>
          </div>
        )}
      </div>

      <Drawer
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        headerTitle="Create job"
      >
        <CreateJobForm />
      </Drawer>
    </div>
  );
};

export default PostedJobs;
