import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { JobCoreDTO, ProposalCoreDTO } from "@/types/CoreDTO";

interface JobState {
  jobs: (JobCoreDTO & { proposals: ProposalCoreDTO[] })[] | null;
  setJobs: (jobs: (JobCoreDTO & { proposals: ProposalCoreDTO[] })[]) => void;
  clearJobs: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getJobById: (
    id: string
  ) => (JobCoreDTO & { proposals: ProposalCoreDTO[] }) | undefined;
}

export const useClientJobsStore = create<JobState>()(
  devtools(
    (set, get) => ({
      jobs: null,
      loading: false,
      setLoading: (loading) => set({ loading }),
      setJobs: (jobs) => set({ jobs }),
      clearJobs: () => set({ jobs: null }),
      getJobById: (id) => get().jobs?.find((job) => job.id === id),
    }),
    { name: "clientJobsStore" }
  )
);