import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { JobCoreDTO, ProposalCoreDTO } from "@/types/CoreDTO";

interface JobState {
  jobs: JobCoreDTO[] | null;
  setJobs: (jobs: JobCoreDTO[]) => void;
  clearJobs: () => void;
  getJobById: (id: string) => JobCoreDTO | undefined;
}

export const useClientJobsStore = create<JobState>()(
  devtools(
    (set, get) => ({
      jobs: null,
      setJobs: (jobs) => set({ jobs }),
      clearJobs: () => set({ jobs: null }),
      getJobById: (id) => get().jobs?.find((job) => job.id === id),
    }),
    { name: "clientJobsStore" }
  )
);
