import { getAllPostedJobsAction } from "@/actions/client.actions";
import { useClientJobsStore } from "@/store/clientJobsStore";

export const fetchClientJobsAndSet = async () => {
  useClientJobsStore.getState().setLoading(true);
  const response = await getAllPostedJobsAction();
  if (response.success) {
    useClientJobsStore.getState().setJobs(response.jobs);
  } else {
    useClientJobsStore.getState().setJobs([]);
    console.log("error in getting jobs:", response.message);
  }
  useClientJobsStore.getState().setLoading(false);
};
