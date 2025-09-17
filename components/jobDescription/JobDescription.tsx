"use client";

import {
  CheckCircle,
  DollarSign,
  ExternalLink,
  Heart,
  Link2,
  Loader2,
  MapPin,
  Star,
  UserPen,
} from "lucide-react";
import Reviews from "./Reviews";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import JobDetailsSkeleton from "../loader/JobDetailsSkeleton";
import { useSaveJob } from "@/hooks/useSaveJob";
import Link from "next/link";
import { getJobDetailsAction } from "@/actions/job.action";
import { JobWithClient } from "@/types/type";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import CollapsibleText from "../reusable/CollapsibleText";


const JobDescription = () => {
  const [job, setJob] = useState<JobWithClient>();
  const [loading, setLoading] = useState(false);


  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");

  // fetch job details
  const fetchJob = async (jobId: string) => {
    setLoading(true);
    const response = await getJobDetailsAction(jobId);
    if (response.success) {
      setJob(response.job);
    } else {
      toast.error(response?.message ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!jobId) return;
    fetchJob(jobId);
  }, [jobId]);

  const { saveJob, loading: saveJobLoading } = useSaveJob();

  if (loading) {
    return <JobDetailsSkeleton />;
  }

  // handle save job
  const handleSaveJob = async () => {
    if (!job) return;

    const response = await saveJob(job.id);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 space-y-12">

      <Link
        href={`/job/?_id=${jobId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 flex items-center justify-end gap-2 text-sm"
      >
        <ExternalLink />
        Open Job in a new Window
      </Link>


      {/* Job Header */}
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {job?.title}
        </h1>
        <div className="flex flex-wrap text-sm items-center gap-6 text-gray-600 ">
          <p>
            Posted on{" "}
            {job?.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "Unknown date"}
          </p>
          <span className="flex items-center gap-2">
            <MapPin className="size-5" />
            Worldwide
          </span>
        </div>
      </header>

      {/* Connects Info */}
      <section className="flex gap-10 text-gray-700 text-sm">
        <div>
          <p>
            Required Connects:{" "}
            <span className="font-medium text-gray-900">
              {job?.connectsRequired}
            </span>
          </p>
          <p>
            Available Connects:{" "}
            <span className="font-medium text-gray-900">200</span>
          </p>
        </div>
      </section>

      {/* Job Summary */}
      <section className="space-y-4 relative">
        <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
        <CollapsibleText text={job?.description ?? ""} />
      </section>

      {/* Price & Level */}
      <section className="flex flex-wrap gap-16 border-t border-gray-200 pt-8">
        <div className="flex items-start gap-3">
          <DollarSign className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {job?.budget}
            </p>
            <p className="text-sm text-gray-500">Fixed-price</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <UserPen className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {job?.experienceRequired}
            </p>
            <p className="text-sm text-gray-500">Experience</p>
          </div>
        </div>
      </section>

      {/* Attachment */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Attachment</h2>

        {job?.attachment ? (
          <a
            href={job.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-sm text-green-600 hover:underline"
          >
            <Link2 className="size-4" />
            View Attachment
          </a>
        ) : (
          <p className="mt-3 text-sm text-gray-500 italic">
            No attachment provided
          </p>
        )}
      </section>

      {/* Skills */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Skills & Expertise
        </h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {job?.skills?.map((skill, i) => (
            <li
              key={i}
              className="text-sm bg-gray-100 text-gray-800 px-4 py-1 rounded-2xl hover:bg-green-100 transition"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Proposals */}
      <footer className="border-t border-gray-200 pt-8">
        <p className="text-base text-gray-500">
          Total proposals: {job?.numberOfProposals}
        </p>
      </footer>

      {/* Client Details */}
      <section className="mt-10 border p-6 bg-white rounded-2xl shadow-sm space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          About the Client
        </h2>

        {/* profile */}
        {job?.client.user.profileImage ? (
          <Image
            src={job.client.user.profileImage}
            height={96}
            width={96}
            alt="user profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-xl border-2 border-green-500">
            {job?.client.user.firstName?.[0] || ""}
            {job?.client.user.lastName?.[0] || ""}
          </div>
        )}

        <div>
          <p className="text-lg font-semibold text-gray-900 capitalize">
            {job?.client.user.firstName + " " + job?.client.user.lastName}
          </p>
          <p className="text-gray-600">{job?.client.company}</p>
        </div>

        <div className="space-y-1 text-base text-gray-700">
          <p>
            Email: <span className="font-medium">{job?.client.user.email}</span>
          </p>
          <p>
            Website:{" "}
            {job?.client.websiteLink ? (
              <a
                href={job.client.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Visit Website
              </a>
            ) : (
              <span className="text-gray-500 italic">Not provided</span>
            )}
          </p>
        </div>

        <div className="space-y-2 text-base text-gray-700">
          <p className="flex items-center gap-2">
            <CheckCircle className="size-5 text-green-600" />
            Payment method verified
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="size-5 text-green-600" />
            Phone number verified
          </p>
        </div>

        <div className="flex items-center gap-2 text-base text-gray-700">
          {Array.from(
            { length: Math.round(job?.client?.rating ?? 0) },
            (_, i) => (
              <Star
                key={i}
                className="size-5 text-yellow-500 fill-yellow-500"
              />
            )
          )}
          <span className="font-medium">5.0</span>
        </div>

        <div className="space-y-2 text-base text-gray-700">
          <p className="flex items-center gap-2">
            <MapPin className="size-5 text-gray-500" />
            {job?.client?.user?.country || "Not Available"}
          </p>
          <p>{job?.client?.jobsPosted || 0} jobs posted</p>
          <p>${job?.client.totalSpent || 0} total spent</p>
          <p>
            Member since{" "}
            {job?.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "Unknown date"}
          </p>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-10">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md cursor-pointer p-0 transition">
          <Link
            href={`/developer/make-proposal?jobId=${jobId}`}
            className="flex items-center justify-center w-full h-full py-3"
          >
            Apply Now
          </Link>
        </Button>

        <Button
          onClick={handleSaveJob}
          className="flex-1 bg-white border border-green-600 text-green-600 font-medium rounded-md py-3 flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white transition"
        >
          {saveJobLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-green-700" />
          ) : (
            <Heart className="size-5" />
          )}
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;

