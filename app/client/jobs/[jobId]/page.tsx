import { Suspense } from "react";
import { AlertTriangle, Settings2 } from "lucide-react";
import { JobStatusToggle } from "../../components/JobStatusToggle";
import JobDetails from "../../components/JobDetails";
import ProposalSkeleton from "@/components/loader/ProposalSkeleton";
import JobDetailsSkeleton from "@/components/loader/JobDetailsSkeleton";
import { getJobByIdAction } from "@/actions/client.actions";
import ProposalsSection from "./proposals-section";
import SuggestedDevsSection from "./suggested-section";
import HiredSection from "./hired-section";

type PageProps = { params: Promise<{ jobId: string }> };

const JobDescriptionPage = async ({ params }: PageProps) => {
  const { jobId } = await params;
  const jobRes = await getJobByIdAction(jobId);

  if (!jobRes.success || !jobRes.job)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200 text-red-700 space-y-3">
          <AlertTriangle className="w-12 h-12" />
          <h2 className="text-lg font-semibold">Job not found</h2>
          <p className="text-sm text-center">
            We couldn not find the job you are looking for. Please try again later
            or check other listings.
          </p>
        </div>
      </div>
    );

  const job = jobRes.job;

  return (
    <div className="max-w-7xl mx-auto py-5 px-4 md:px-10 space-y-8">
      <div className="space-y-8">
        <Suspense fallback={<JobDetailsSkeleton />}>
          <JobDetails job={job} />
        </Suspense>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Settings2 className="h-4 w-4 text-gray-500" />
          <span>Change Job Status</span>
        </div>
        <JobStatusToggle jobId={jobId as string} currentStatus={job.status} />

        <hr />

        {job.hiredFreelancerId ? (
          <HiredSection jobId={job.id} />
        ) : (
          <>
            <Suspense fallback={<ProposalSkeleton />}>
              {/* Server fetch proposals, render table or empty state */}
              <ProposalsSection jobId={job.id} />
            </Suspense>
          </>
        )}
      </div>

      {!job.hiredFreelancerId && (
        <div>
          <Suspense
            fallback={
              <div className="p-4 animate-pulse text-sm text-gray-500">Loading suggestions…</div>
            }
          >
            {/* Server fetch suggested devs, render cards or empty state */}
            <SuggestedDevsSection category={job.category} speciality={job.speciality} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionPage;
