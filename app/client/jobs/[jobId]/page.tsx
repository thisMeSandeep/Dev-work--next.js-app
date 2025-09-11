"use client";

import { useClientJobsStore } from "@/store/clientJobsStore";
import { useParams } from "next/navigation";
import React from "react";
import JobDetails from "../../components/JobDetails";
import ProposalsTable from "../../components/Proposalstable";
import SuggestedDevs from "../../components/SuggestedDevs";

const JobDescriptionPage = () => {
  const { jobId } = useParams();

  // get job details
  const job = useClientJobsStore((state) =>
    typeof jobId === "string" ? state.getJobById(jobId) : undefined
  );

  if (!job) return <div>Job not found</div>;

  const { proposals, ...rest } = job;

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 md:px-10 space-y-8">
      {/* Left section (job details + proposals) */}
      <div className="space-y-8">
        <JobDetails job={rest} />

        <hr />

        <ProposalsTable jobId={job.id} />
      </div>

      {/* Right sidebar (suggested developers) */}
      <div>
        <SuggestedDevs
          category={job.category}
          speciality={job.speciality}
        />
      </div>
    </div>
  );

};

export default JobDescriptionPage;
