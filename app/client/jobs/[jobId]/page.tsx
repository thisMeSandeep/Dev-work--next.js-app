"use client";

import { useClientJobsStore } from "@/store/clientJobsStore";
import { useParams } from "next/navigation";
import React from "react";
import JobDetails from "../../components/JobDetails";
import ProposalsTable from "../../components/Proposalstable";
import SuggestedDevs from "../../components/SuggestedDevs";
import { AlertTriangle, Settings2 } from "lucide-react";
import { JobStatusToggle } from "../../components/JobStatusToggle";

const JobDescriptionPage = () => {
  const { jobId } = useParams();

  // get job details
  const job = useClientJobsStore((state) =>
    typeof jobId === "string" ? state.getJobById(jobId) : undefined
  );

  if (!job)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200 text-red-700 space-y-3">
          <AlertTriangle className="w-12 h-12" />
          <h2 className="text-lg font-semibold">Job not found</h2>
          <p className="text-sm text-center">
            We couldn't find the job you are looking for. Please try again later
            or check other listings.
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 md:px-10 space-y-8">
      <div className="space-y-8">
        <JobDetails job={job} />

        {/* change job status */}

        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Settings2 className="h-4 w-4 text-gray-500" />
          <span>Change Job Status</span>
        </div>
        <JobStatusToggle jobId={jobId as string} currentStatus={job.status} />

        <hr />

        <ProposalsTable jobId={job.id} />
      </div>

      {/* Right sidebar (suggested developers) */}
      <div>
        <SuggestedDevs category={job.category} speciality={job.speciality} />
      </div>
    </div>
  );
};

export default JobDescriptionPage;
