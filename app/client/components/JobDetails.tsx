import { Card, CardContent } from "@/components/ui/card";
import { formatString } from "@/lib/formatString";
import { JobCoreDTO } from "@/types/CoreDTO";
import {
  Briefcase,
  Tag,
  Clock,
  Users,
  DollarSign,
  ClipboardCheck,
  Calendar,
  Paperclip,
  UserCheck,
  Award,
} from "lucide-react";
import CollapsibleText from "@/components/reusable/CollapsibleText";

interface JobDetailsProps {
  job: JobCoreDTO;
}

export default function JobDetails({ job }: JobDetailsProps) {

  return (
    <Card className="border-none shadow-none p-0">
      <CardContent className="space-y-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <Briefcase className="text-green-600 size-6 shrink-0" />
          <h1 className="text-lg md:text-2xl font-semibold text-green-700 break-words">
            {job.title}
          </h1>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <Calendar className="text-green-600 size-5" />
          <span>Posted on {job.createdAt.toDateString()}</span>
        </div>

        {/* Description with Read More */}
        {job.description && (
          <CollapsibleText text={job.description} />
        )}

        {/* Category & Speciality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Tag className="text-green-600 shrink-0" />
            <span className="text-sm text-gray-700 break-words">
              {formatString(job.category)} | {formatString(job.speciality)}
            </span>
          </div>
          {job.duration && (
            <div className="flex items-center gap-2">
              <Clock className="text-green-600 shrink-0" />
              <span className="text-sm text-gray-700 break-words">
                {formatString(job.duration)}
              </span>
            </div>
          )}
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div>
            <h3 className="font-medium text-green-700 mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Budget & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="text-green-600 shrink-0" />
            <span className="text-gray-700 font-medium">${job.budget}</span>
          </div>
          {job.experienceRequired && (
            <div className="flex items-center gap-2">
              <Award className="text-green-600 shrink-0" />
              <span className="text-gray-700">{job.experienceRequired}</span>
            </div>
          )}
        </div>

        {/* Proposals & Connects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="text-green-600 shrink-0" />
            <span className="text-gray-700">
              {job.numberOfProposals} Proposals
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="text-green-600 shrink-0" />
            <span className="text-gray-700">
              {job.connectsRequired} Connects
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <UserCheck className="text-green-600" />
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              job.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {job.completed ? "Completed" : job.status}
          </span>
        </div>

        {/* Attachment */}
        <div className="flex items-center gap-2">
          <Paperclip className="text-green-600 shrink-0" />
          {job.attachment ? (
            <a
              href={job.attachment}
              className="text-green-700 underline text-sm break-all"
            >
              View Attachment
            </a>
          ) : (
            <span className="text-sm text-gray-500">No attachment</span>
          )}
        </div>

        {/* Hired Freelancer */}
        {job.hiredFreelancerId && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserCheck className="text-green-600" />
            <span>Freelancer Hired</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
