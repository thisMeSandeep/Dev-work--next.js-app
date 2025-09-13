"use client";

import { getAJobAction } from "@/actions/job.action";
import JobSkeleton from "@/components/loader/JobSkeleton";
import ProposalSettingsSkeleton from "@/components/loader/ProposalSettingsSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { formatString } from "@/lib/formatString";
import { useUserStore } from "@/store/userStore";
import { JobDTO } from "@/types/customtypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProposalForm from "../components/ProposalForm";
import { MessageCircleWarning } from "lucide-react";

const MakeProposal = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const user = useUserStore((state) => state.user);

  const [job, setJob] = useState<JobDTO>();
  const [jobLoading, setJobLoading] = useState(false);

  // fetch job
  const fetchJob = async (jobId: string) => {
    setJobLoading(true);
    const response = await getAJobAction(jobId);
    if (response.success) {
      setJob(response.job);
    } else {
      toast.error(response?.message ?? "Something went wrong");
    }
    setJobLoading(false);
  };

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId);
    }
  }, [jobId]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-10 space-y-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-10">
        Sumbit a propsal
      </h1>

      {/* proposal settings */}
      {jobLoading ? (
        <ProposalSettingsSkeleton />
      ) : (
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Proposal Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="space-y-2">
              <p>
                This proposal requires{" "}
                <span className="text-black font-semibold">
                  {job?.connectsRequired ?? 0}
                </span>{" "}
                Connects
              </p>
              <p>
                When you submit this proposal, you&apos;ll have{" "}
                <span className="text-black font-semibold">
                  {(user?.FreelancerProfile?.connects ?? 0) -
                    (job?.connectsRequired ?? 0)}
                </span>{" "}
                Connects remaining.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {/* Job description */}
      {jobLoading ? (
        <JobSkeleton />
      ) : (
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Job Description
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row gap-8">
            {/* Left section */}
            <div className="space-y-4 flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {job?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-gray-200 py-1 px-2 rounded-2xl text-sm">
                  {formatString(job?.speciality as string)}
                </span>
                <span className="text-gray-500">
                  Posted {job?.createdAt ? formatDate(job.createdAt) : ""}
                </span>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7 font-normal tracking-wide line-clamp-2">
                {job?.description}
              </p>

              <Link
                href={`/job?jobId=${job?.id}`}
                className="text-green-600 underline"
              >
                View job posting
              </Link>
            </div>

            {/* Right section (job details) */}
            <div className="space-y-4 w-full md:w-[300px]">
              <div>
                <p className="text-black font-medium">
                  {job?.experienceRequired}
                </p>
                <p className="text-gray-500 text-sm">Experience Required</p>
              </div>
              <div>
                <p className="text-black font-medium">${job?.budget}</p>
                <p className="text-gray-500 text-sm">Fixed-price</p>
              </div>
              <div>
                <p className="text-black font-medium">
                  {formatString(job?.duration)}
                </p>
                <p className="text-gray-500 text-sm">Project length</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-start">
            <h3 className="text-lg font-semibold text-gray-800">
              Skills and expertise
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {job?.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 py-1 px-2 rounded-2xl text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      )}

      {/* proposal form */}
      <section>
        {!jobLoading && <ProposalForm jobId={jobId as string} />}
      </section>
    </div>
  );
};

export default MakeProposal;
