"use client";
import { Loader2, Trash2, Briefcase } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import SkillSlider from "@/components/jobCard/SkillsSlider";
import { unsaveJobAction } from "@/actions/developer.action";
import toast from "react-hot-toast";
import Drawer from "@/components/reusable/Drawer";
import JobDescription from "@/components/jobDescription/JobDescription";
import { JobCoreDTO } from "@/types/CoreDTO";
import { useRouter } from "next/navigation";

const SavedJobsList = ({ jobs }: { jobs: JobCoreDTO[] }) => {

    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const router = useRouter();

    const handleUnsaveJob = async (jobId: string) => {
        setLoadingId(jobId);
        try {
            const response = await unsaveJobAction(jobId);
            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to unsave job");
        } finally {
            setLoadingId(null);
        }
    };

    const handleDrawerOpen = (jobId: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('job', jobId);
        window.history.pushState({}, '', url);
        setOpenDrawer(true);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-5">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Saved Jobs</h1>
                <p className="text-gray-500">{jobs?.length ?? 0} jobs saved</p>
            </div>

            {/* empty state */}
            {(!jobs || jobs.length === 0) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700">No saved jobs yet</p>
                    <p className="text-gray-500 mt-1">
                        Browse jobs and save the ones you like.
                    </p>
                    <Link
                        href="/developer"
                        className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-green-600 hover:underline  text-sm font-medium "
                    >
                        <Briefcase className="h-4 w-4" />
                        Go to Jobs
                    </Link>
                </div>
            )}

            {/* job list */}
            <div className="space-y-6">
                {jobs?.map((job) => (
                    <div
                        key={job.id}
                        className="w-full text-left group p-4 sm:p-6 bg-white  transition-all duration-300 ease-in-out "
                    >
                        {/* date */}
                        <p className="text-sm text-gray-500">
                            {new Date(job.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex items-center gap-4">
                            {/* title */}
                            <button
                                onClick={() => handleDrawerOpen(job.id)}
                                className="text-xl text-left underline font-semibold text-gray-900 transition-colors duration-300 group-hover:text-green-600 cursor-pointer"
                            >
                                {job.title}
                            </button>
                            {/* status */}
                            <p>
                                {job.status ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        Open
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                        Closed
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* meta */}
                        <p className="mt-3 text-gray-500 text-sm">
                            {job.category} • {job.experienceRequired} • ${job.budget}
                        </p>

                        {/* description */}
                        <p className="text-gray-800 mt-3 text-sm sm:text-base leading-6 line-clamp-3">
                            {job.description}
                        </p>

                        {/* skills */}
                        <div className="mt-4">
                            <SkillSlider skills={job.skills} />
                        </div>

                        {/* proposals */}
                        <p className="mt-4 text-gray-500 font-light">
                            Proposals:{" "}
                            <span className="font-medium text-gray-800">
                                {job.numberOfProposals}
                            </span>
                        </p>

                        {/* unsave button */}
                        <div className="mt-2 flex justify-end">
                            {loadingId === job.id ? (
                                <div className="p-2 rounded-full">
                                    <Loader2 className="h-5 w-5 animate-spin text-green-700" />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleUnsaveJob(job.id)}
                                    aria-label="Unsave job"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors duration-200 cursor-pointer"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Unsave
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* drawer */}
            {openDrawer && (
                <Drawer
                    isOpen={openDrawer}
                    onClose={() => {
                        setOpenDrawer(false);
                        window.history.pushState({}, '', '/developer/saved-jobs');
                    }}
                    headerTitle="Job desciption"
                >
                    {<JobDescription />}
                </Drawer>
            )}
        </div>
    );
};

export default SavedJobsList;



