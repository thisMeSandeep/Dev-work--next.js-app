import { getPersonalizedJobsAction } from "@/actions/job.action";
import JobsList from "./JobsList";
import ErrorPage from "@/components/reusable/ErrorPage";

export default async function PersonalizedJobsTab() {
    const res = await getPersonalizedJobsAction();

    if (!res.success) {
        return <ErrorPage message={res.message} />;
    }

    return <JobsList jobs={res.jobs} />;
}
