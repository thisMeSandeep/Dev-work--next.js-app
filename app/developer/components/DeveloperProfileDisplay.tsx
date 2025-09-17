import {
  User,
  Phone,
  FileText,
  Code,
  DollarSign,
  Globe,
  Languages,
  Award,
  Link2,
  File,
} from "lucide-react";
import { formatString } from "@/lib/formatString";
import { useUserStore } from "@/store/userStore";
import CollapsibleText from "@/components/reusable/CollapsibleText";

const DeveloperProfileDisplay = () => {

  const user = useUserStore((state) => state.user);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">
          Developer Profile
        </h2>
      </div>

      {/* Profile Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

        {/* Available Status */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <User className="w-4 h-4" /> Available
          </span>
          <span className={user?.FreelancerProfile?.available ? "text-green-600" : "text-red-600"}>
            {user?.FreelancerProfile?.available ? "Yes" : "No"}
          </span>
        </div>

        {/* Mobile */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Phone className="w-4 h-4" /> Mobile
          </span>
          <span>{user?.FreelancerProfile?.mobile || "Not set"}</span>
        </div>

        {/* Bio */}
        <div className="flex flex-col md:col-span-2">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <FileText className="w-4 h-4" /> Bio
          </span>
          <CollapsibleText text={ user?.FreelancerProfile?.bio || "No bio provided"} />
        </div>

        {/* Skills */}
        <div className="flex flex-col md:col-span-2">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Code className="w-4 h-4" /> Skills
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(user?.FreelancerProfile?.skills) && user.FreelancerProfile.skills.length > 0 ? (
              user.FreelancerProfile.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-lg bg-green-700 text-white px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Code className="w-4 h-4" /> Category
          </span>
          <span>{user?.FreelancerProfile?.category && formatString(user.FreelancerProfile.category) || "Not set"}</span>
        </div>

        {/* Speciality */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Code className="w-4 h-4" /> Speciality
          </span>
          <span>{user?.FreelancerProfile?.speciality && formatString(user.FreelancerProfile.speciality) || "Not set"}</span>
        </div>

        {/* Experience Level */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Award className="w-4 h-4" /> Experience Level
          </span>
          <span>{user?.FreelancerProfile?.experienceLevel && formatString(user.FreelancerProfile.experienceLevel) || "Not set"}</span>
        </div>

        {/* Hourly Rate */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <DollarSign className="w-4 h-4" /> Hourly Rate (USD)
          </span>
          <span>
            {user?.FreelancerProfile?.perHourRate ? `$${user.FreelancerProfile.perHourRate}/hr` : "Not set"}
          </span>
        </div>

        {/* Languages */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Languages className="w-4 h-4" /> Languages
          </span>
          <span>{user?.FreelancerProfile?.languages || "Not set"}</span>
        </div>

        {/* Portfolio Link */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Globe className="w-4 h-4" /> Portfolio
          </span>
          {user?.FreelancerProfile?.portfolioLink ? (
            <a
              href={user.FreelancerProfile.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline hover:text-green-600"
            >
              Open
            </a>
          ) : (
            <span>Not set</span>
          )}
        </div>

        {/* Other Link */}
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <Link2 className="w-4 h-4" /> Other Link
          </span>
          {user?.FreelancerProfile?.otherLink ? (
            <a
              href={user.FreelancerProfile.otherLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline hover:text-green-600"
            >
              Open
            </a>
          ) : (
            <span>Not set</span>
          )}
        </div>

        {/* Resume/CV */}
        <div className="flex flex-col md:col-span-2">
          <span className="flex items-center gap-2 font-medium text-green-700">
            <File className="w-4 h-4" /> Resume/CV
          </span>
          {user?.FreelancerProfile?.file ? (
            <a
              href={user.FreelancerProfile.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline hover:text-green-600"
            >
              View Resume/CV
            </a>
          ) : (
            <span>No file uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfileDisplay;



