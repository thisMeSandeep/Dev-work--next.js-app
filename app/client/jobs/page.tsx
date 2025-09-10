"use client";

import Drawer from "@/components/reusable/Drawer";
import { useUserStore } from "@/store/userStore";
import { Award, Briefcase, DollarSign, Users } from "lucide-react";
import { useState } from "react";
import CreateJobForm from "../components/CreateJobForm";
import { useClientJobsStore } from "@/store/clientJobsStore";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { formatString } from "@/lib/formatString";

const PostedJobs = () => {
  const [openModel, setOpenModel] = useState(false);

  const user = useUserStore((state) => state.user);

  const jobs = useClientJobsStore((state) => state.jobs);

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
      <div className=" mt-10">
        {user?.ClientProfile?.postedJobs?.length === 0 ? (
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
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{jobs?.length} jobs posted</h3>

            <div className="space-y-5 mt-5">
              {jobs?.map((job) => (
                <Card key={job.id} className="transition-all border-none shadow-none">
                  <CardContent className="space-y-3">
                    {/* Job Title */}
                    <Link
                      href={`/client/jobs/${job.id}`}
                      className="text-xl font-semibold text-green-600 hover:underline"
                    >
                      {job.title}
                    </Link>

                    {/* Short description */}
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {job.description}
                    </p>

                    {/* Job Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        <span>{formatString(job.category)} • {formatString(job.speciality)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span>${job.budget}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{job.numberOfProposals} proposals</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-500" />
                        <span>{job.experienceRequired}</span>
                      </div>
                    </div>

                    {/* Created At */}
                    <p className="text-xs text-gray-400">
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

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
