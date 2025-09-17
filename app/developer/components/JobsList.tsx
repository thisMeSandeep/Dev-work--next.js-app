"use client";

import JobCard from "@/components/jobCard/JobCard";
import JobDescription from "@/components/jobDescription/JobDescription";
import Drawer from "@/components/reusable/Drawer";
import { JobWithClient } from "@/types/type";
import {FileQuestion } from "lucide-react";
import { useState } from "react";

const JobsList = ({ jobs }: { jobs: JobWithClient[] }) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleJobClick = (jobId: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('job', jobId);
        window.history.pushState({}, '', url);
        setOpenDrawer(true);
    };

    return (
        <div>
        
            {/* jobs list */}
            <div className="mt-5 md:mt-8">
                {jobs.length === 0 ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-center text-gray-500">
                        <FileQuestion className="h-16 w-16 mb-4 text-gray-400" />
                        <h2 className="text-lg font-semibold">No jobs found</h2>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {jobs.map((job, i) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                index={i}
                                onClick={handleJobClick}
                            />
                        ))}
                    </div>
                )}
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

export default JobsList;
