import { Card } from "@/components/ui/card";
import {
  User,
  Mail,
  Briefcase,
  DollarSign,
  FileText,
} from "lucide-react";

interface DeveloperStatsCardProps {
  name: string;
  email: string;
  jobsApplied: number;
  jobsHired: number;
  totalEarnings: number;
}

export const DeveloperStatsCard = ({
  name,
  email,
  jobsApplied,
  jobsHired,
  totalEarnings,
}: DeveloperStatsCardProps) => {
  return (
    <Card className="w-full border-none shadow-none">
      <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-6">
        Developer Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        {/* Name */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <User className="w-4 h-4" /> Name
          </span>
          <span>{name || "Not set"}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Mail className="w-4 h-4" /> Email
          </span>
          <span>{email || "Not set"}</span>
        </div>

        {/* Jobs Applied */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Briefcase className="w-4 h-4" /> Jobs Applied
          </span>
          <span>{jobsApplied}</span>
        </div>

        {/* Jobs Hired */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <FileText className="w-4 h-4" /> Jobs Hired
          </span>
          <span>{jobsHired}</span>
        </div>

        {/* Total Earnings */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <DollarSign className="w-4 h-4" /> Total Earnings
          </span>
          <span>${totalEarnings.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
