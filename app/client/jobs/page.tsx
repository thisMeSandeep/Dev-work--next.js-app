"use client";

import Drawer from "@/components/reusable/Drawer";
import { useUserStore } from "@/store/userStore";
import { Briefcase, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateJobForm from "../components/CreateJobForm";

const PostedJobs = () => {
  const [openModel, setOpenModel] = useState(false);

  const user = useUserStore((state) => state.user) as Record<string, unknown>;

  return (
    <div className="max-w-7xl mx-auto py-5">
      {/* Show empty jobs area */}
      <div className="flex items-center justify-center min-h-[60vh]">
        {!user.ClientProfile ? (
          <div className="flex flex-col items-center text-center space-y-3 text-gray-600">
            <UserPlus className="h-12 w-12 text-green-600" />
            <p className="text-lg font-medium">
              You need to create a profile before posting jobs.
            </p>
            <Link
              href="/client/profile"
              className="text-green-600 font-medium hover:underline"
            >
              Create your profile →
            </Link>
          </div>
        ) : (user.ClientProfile as { postedJobs?: any[] })?.postedJobs
            ?.length === 0 ? (
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

      <Drawer isOpen={openModel} onClose={()=>setOpenModel(false)} headerTitle="Create job">
        <CreateJobForm />
      </Drawer>
    </div>
  );
};

export default PostedJobs;
