import { Card } from "@/components/ui/card";
import { User, Mail, Briefcase, DollarSign, FileText, Star } from "lucide-react";

interface ClientStatsCardProps {
  name: string;
  email: string;
  jobsPosted: number;
  totalSpent: number; 
  proposals: number;
  rating: number; 
}

export const ClientStatsCard = ({
  name,
  email,
  jobsPosted,
  totalSpent,
  proposals,
  rating,
}: ClientStatsCardProps) => {
  return (
    <Card className="w-full p-6 rounded-md border-none shadow-none">
      <h2 className="text-xl md:text-2xl font-semibold text-green-700 mb-6">
        Client Stats
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

        {/* Jobs Posted */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Briefcase className="w-4 h-4" /> Jobs Posted
          </span>
          <span>{jobsPosted}</span>
        </div>

        {/* Total Spent */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <DollarSign className="w-4 h-4" /> Total Spent
          </span>
          <span>{totalSpent}</span>
        </div>

        {/* Proposals */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <FileText className="w-4 h-4" /> Proposals
          </span>
          <span>{proposals}</span>
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Star className="w-4 h-4" /> Rating
          </span>
          <span>{rating} / 5</span>
        </div>
      </div>
    </Card>
  );
};
