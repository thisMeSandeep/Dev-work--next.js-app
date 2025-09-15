"use client";

import { getJobsAction } from "@/actions/job.action";
import JobCard from "@/components/jobCard/JobCard";
import JobDescription from "@/components/jobDescription/JobDescription";
import WorkCardSkeleton from "@/components/loader/WorkCardSkeleton";
import Drawer from "@/components/reusable/Drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { categories, specialities } from "@/data/JobData";
import { JobWithClient } from "@/types/type";

import { ArrowRight, FileQuestion, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Developer = () => {
  const [jobs, setJobs] = useState<JobWithClient[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [jobId, setJobId] = useState<string>("");

  // fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobsAction({});
      setJobs(response.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobClick = (jobId: string) => {
    setJobId(jobId);
    setOpenDrawer(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-5">
      {/* complete you profile */}
      <div className="flex  justify-end group">
        <Link
          href="/developer/profile"
          className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium transition-colors"
        >
          Complete your profile
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-300" />
        </Link>
      </div>

      {/* search and filter box */}
      <div className="mt-10 space-y-5">
        {/* search */}
        <div className="relative">
          <Input
            placeholder="Frontend job..."
            className="w-full rounded-sm border border-gray-300 pl-15 py-2 text-sm focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="size-5 text-gray-400 absolute top-1/2 left-2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-5">
          {/* Filter by  category*/}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item.label} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by speciality */}
          <Select value={speciality} onValueChange={setSpeciality}>
            <SelectTrigger className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none">
              <SelectValue placeholder="Filter by speciality" />
            </SelectTrigger>
            <SelectContent>
              {specialities.map((item) => (
                <SelectItem key={item.label} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-5 text-gray-500">{jobs.length} Jobs found </p>

      {/* jobs list */}
      <div className="mt-10">
        {loading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }, (_, i) => (
              <WorkCardSkeleton key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center text-gray-500">
            <FileQuestion className="h-16 w-16 mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold">No jobs found</h2>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your filters or check back later.
            </p>
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
            setJobId("");
          }}
          headerTitle="Job desciption"
        >
          {jobId && <JobDescription jobId={jobId} />}
        </Drawer>
      )}
    </div>
  );
};

export default Developer;
