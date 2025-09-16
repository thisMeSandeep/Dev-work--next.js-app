import { getSavedJobsAction } from "@/actions/developer.action";
import SavedJobsList from "./SavedJobsList";
import ErrorPage from "@/components/reusable/ErrorPage";

const SavedJobs = async () => {
    const response = await getSavedJobsAction();

    if (response.success && response.data) {
        return <SavedJobsList jobs={response.data} />;
    } else {
    return <ErrorPage message={response.message} />
    }
};

export default SavedJobs;
