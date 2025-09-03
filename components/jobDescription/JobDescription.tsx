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

type JobProps = {
  jobId: string;
};

const JobDescription = ({ jobId }: JobProps) => {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 space-y-12">
      {/* Job Header */}
      <header className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Optimize CSS for Website
        </h1>
        <div className="flex flex-wrap text-sm items-center gap-6 text-gray-600 ">
          <time dateTime="2025-08-16">Posted on Aug 16, 2025</time>
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
            <span className="font-medium text-gray-900">14</span>
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          sed laudantium earum consequuntur, vitae optio voluptas? Nostrum totam
          non, accusantium, hic maiores aperiam, quis ratione autem fuga placeat
          reiciendis laborum officia vitae laudantium minus est sequi iusto quo
          cupiditate cum dolorem? Repellat magnam voluptate ad sunt eligendi
          deleniti corporis itaque.
        </p>
      </section>

      {/* Price & Level */}
      <section className="flex flex-wrap gap-16 border-t border-gray-200 pt-8">
        <div className="flex items-start gap-3">
          <DollarSign className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-medium text-gray-900">$15.00</p>
            <p className="text-sm text-gray-500">Fixed-price</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <UserPen className="size-5 mt-1 text-gray-500" />
          <div>
            <p className="text-lg font-medium text-gray-900">Entry Level</p>
            <p className="text-sm text-gray-500">Experience</p>
          </div>
        </div>
      </section>

      {/* Attachment */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Attachment</h2>
        <a
          href="#"
          className="mt-3 flex items-center gap-2 text-sm text-green-600 hover:underline"
        >
          <Link className="size-4" />
          Attachment link will come here
        </a>
      </section>

      {/* Skills */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Skills & Expertise
        </h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {Array.from({ length: 10 }, (_, i) => (
            <li
              key={i}
              className="text-sm bg-gray-100 text-gray-800 px-4 py-1 rounded-2xl"
            >
              Skill-{i + 1}
            </li>
          ))}
        </ul>
      </section>

      {/* Proposals */}
      <footer className="border-t border-gray-200 pt-8">
        <p className="text-base text-gray-500">Total proposals: 20</p>
      </footer>

      {/* Client Details */}
      <section className="mt-10 border p-6 px-5 bg-white rounded-lg shadow-sm space-y-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          About the Client
        </h2>

        <div>
          <p className="text-lg font-medium text-gray-900">John Doe</p>
          <p className="text-gray-600">Acme Corp</p>
        </div>

        <div className="space-y-1 text-base text-gray-700">
          <p>
            Email: <span className="font-medium">johndoe@email.com</span>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://acmecorp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              acmecorp.com
            </a>
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
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-5 text-yellow-500 fill-yellow-500" />
          ))}
          <span className="font-medium">5.0</span>
        </div>

        <div className="space-y-2 text-base text-gray-700">
          <p className="flex items-center gap-2">
            <MapPin className="size-5 text-gray-500" />
            United States
          </p>
          <p>4 jobs posted</p>
          <p>$482 total spent</p>
          <p>Member since Mar 9, 2024</p>
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
