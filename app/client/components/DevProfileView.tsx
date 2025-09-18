"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Link, Globe } from "lucide-react";

import { FreelancerProfileCoreDTO, UserCoreDTO } from "@/types/CoreDTO";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/loader/LoadingButton";
import { useState } from "react";
import { sendRequestAction } from "@/actions/client.actions";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import CollapsibleText from "@/components/reusable/CollapsibleText";

type DevWithUser = FreelancerProfileCoreDTO & {
  user: UserCoreDTO;
};

const DevProfileView = ({ dev }: { dev: DevWithUser }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { jobId } = useParams();

  const developerData = {
    firstName: dev.user.firstName ?? "",
    lastName: dev.user.lastName ?? "",
    email: dev.user.email ?? "",
    country: dev.user.country ?? null,
    profileImage: dev.user.profileImage ?? null,

    mobile: dev.mobile ?? null,
    bio: dev.bio ?? null,
    skills: dev.skills ?? [],
    category: dev.category ?? null,
    speciality: dev.speciality ?? null,
    experienceLevel: dev.experienceLevel ?? null,
    perHourRate: dev.perHourRate ?? null,
    languages: dev.languages ?? null,
    portfolioLink: dev.portfolioLink ?? null,
    otherLink: dev.otherLink ?? null,
  };

  //   send request
  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await sendRequestAction({
      message,
      developerId: dev.id,
      jobId: jobId as string,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="w-full  space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-green-500">
          <AvatarImage src={developerData.profileImage || ""} />
          <AvatarFallback>
            {developerData.firstName?.[0] ?? "D"}
            {developerData.lastName?.[0] ?? ""}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {developerData.firstName} {developerData.lastName}
          </h1>
          <p className="text-green-600 font-medium">
            {developerData.speciality ?? "Freelancer"}
          </p>

          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            {developerData.country && (
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {developerData.country}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Mail size={16} /> {developerData.email}
            </span>
            {developerData.mobile && (
              <span className="flex items-center gap-1">
                <Phone size={16} /> {developerData.mobile}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {developerData.bio && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">About</h2>
          <CollapsibleText text={developerData.bio} />
        </div>
      )}

      {/* Skills */}
      {developerData.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {developerData.skills.map((skill) => (
              <Badge
                key={skill}
                className="bg-green-100 text-green-700 border-green-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {developerData.category && (
          <Detail label="Category" value={developerData.category} />
        )}
        {developerData.experienceLevel && (
          <Detail label="Experience" value={developerData.experienceLevel} />
        )}
        {developerData.perHourRate && (
          <Detail
            label="Hourly Rate"
            value={`$${developerData.perHourRate}/hr`}
          />
        )}
        {developerData.languages && (
          <Detail label="Languages" value={developerData.languages} />
        )}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        {developerData.portfolioLink && (
          <a
            href={developerData.portfolioLink}
            target="_blank"
            className="flex items-center gap-2 text-green-600 hover:underline"
          >
            <Link size={16} /> Portfolio
          </a>
        )}
        {developerData.otherLink && (
          <a
            href={developerData.otherLink}
            target="_blank"
            className="flex items-center gap-2 text-green-600 hover:underline"
          >
            <Globe size={16} /> Other Link
          </a>
        )}
      </div>

      {/* request form */}
      <div>
        <form onSubmit={handleRequest} className="space-y-5">
          <Textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Write you message"
            className="w-full h-[100px] rounded-sm border border-gray-300 px-3 py-2 text-sm focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none transition-colors"
          />
          <div className="w-full sm:w-[250px]">
            <LoadingButton type="submit" isLoading={loading} disabled={loading}>
              {loading ? "Sending" : "Send request for this job"}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-green-700">{value}</p>
  </div>
);

export default DevProfileView;
