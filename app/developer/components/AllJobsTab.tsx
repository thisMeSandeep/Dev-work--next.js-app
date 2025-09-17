import { getAllJobsAction } from "@/actions/job.action";
import JobsList from "./JobsList";
import ErrorPage from "@/components/reusable/ErrorPage";

export default async function AllJobsTab() {
    const res = await getAllJobsAction();

    if (!res.success) {
        return <ErrorPage message={res.message} />;
    }

    return <JobsList jobs={res.jobs} />;
}
