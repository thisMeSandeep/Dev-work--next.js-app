import { getPostedJobsAction } from "@/actions/client.actions";
import { useClientJobsStore } from "@/store/clientJobsStore";

export const fetchClientJobsAndSet = async () => {
  const response = await getPostedJobsAction();
  if (response.success) {
    useClientJobsStore.getState().setJobs(response.jobs ?? []);
  } else {
    useClientJobsStore.getState().setJobs([]);
    console.log("error in getting jobs:", response.message);
  }
};
