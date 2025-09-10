"use client"

import { useClientJobsStore } from '@/store/clientJobsStore';
import { useParams } from 'next/navigation'
import React from 'react'
import JobDetails from '../../components/JobDetails';
import ProposalsTable from '../../components/Proposalstable';

const JobDescriptionPage = () => {

  const { jobId } = useParams();

  // get job details
  const job = useClientJobsStore((state) =>
    typeof jobId === "string" ? state.getJobById(jobId) : undefined
  );

  if (!job) return <div>Job not found</div>

  const { proposals, ...rest } = job;

  return (
    <div className="max-w-7xl mx-auto py-5  px-4 md:px-10 space-y-10">

      <JobDetails job={rest} />

      <hr />

      {/* proposals list */}
      <ProposalsTable jobId={job.id} />


    </div>
  )
}

export default JobDescriptionPage