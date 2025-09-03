"use client";

import {
  CheckCircle,
  DollarSign,
  Heart,
  Link,
  MapPin,
  Star,
  UserPen,
} from "lucide-react";
import Reviews from "./Reviews";
import { Button } from "../ui/button";
import { JobDTO } from "@/types/customtypes";
import { getAJobAction } from "@/actions/job.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import JobDetailsSkeleton from "../loader/JobDetailsSkeleton";

type JobProps = {
  jobId: string;
};

const JobDescription = ({ jobId }: JobProps) => {
  const [job, setJob] = useState<JobDTO>();
  const [loading, setLoading] = useState(false);

  //fetch job using jobId
  const fetchJob = async (jobId: string) => {
    setLoading(true);
    const response = await getAJobAction(jobId);
    if (response.success) {
      setJob(response.job);
    } else {
      toast.error(response?.message ?? "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJob(jobId);
  }, [jobId]);

  if (loading) {
    return <JobDetailsSkeleton />;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 space-y-12">
      {/* Job Header */}
      <header className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
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
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {job?.description}
        </p>
      </section>

      {/* Price & Level */}
      <section className="flex flex-wrap gap-16 border-t border-gray-200 pt-8">
        <div className="flex items-start gap-3">
          <DollarSign className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-medium text-gray-900">{job?.budget}</p>
            <p className="text-sm text-gray-500">Fixed-price</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <UserPen className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-medium text-gray-900">
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
            <Link className="size-4" />
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
              className="text-sm bg-gray-100 text-gray-800 px-4 py-1 rounded-2xl"
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
      <section className="mt-10 border p-6 px-5 bg-white rounded-lg shadow-sm space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          About the Client
        </h2>

        <div>
          <p className="text-lg font-medium text-gray-900 capitalize">
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
          <p>4 jobs posted</p>
          <p>$482 total spent</p>
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
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-3 cursor-pointer">
          Apply Now
        </Button>
        <Button className="flex-1 bg-white border border-green-600 text-green-600 font-medium rounded-md py-3 flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white duration-300 cursor-pointer">
          <Heart className="size-5" />
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default JobDescription;
