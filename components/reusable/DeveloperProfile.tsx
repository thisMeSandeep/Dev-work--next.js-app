import { formatString } from "@/lib/formatString";
import { Mail, Phone, Globe, Link as LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";

type DeveloperProfileProps = {
    dev: {
        firstName: string;
        lastName: string;
        email: string;
        country?: string | null;
        profileImage?: string | null;

        mobile?: string | null;
        bio?: string | null;
        skills?: string[];
        category?: string | null;
        speciality?: string | null;
        experienceLevel?: string | null;
        perHourRate?: number | null;
        languages?: string | null;
        portfolioLink?: string | null;
        otherLink?: string | null;
    };
};

export default function DeveloperProfile({ dev }: DeveloperProfileProps) {
    const fullName = `${dev.firstName} ${dev.lastName}`;
    const initials = `${dev.firstName?.[0] || ""}${dev.lastName?.[0] || ""}`.toUpperCase();

    return (
        <div className="w-full mx-auto p-6 bg-white  space-y-6">
            {/* Top section */}
            <div className="flex items-center gap-4">
                {dev.profileImage ? (
                    <Image
                        src={dev.profileImage}
                        height={96}
                        width={96}
                        alt={fullName}
                        className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                    />
                ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-xl border-2 border-green-500">
                        {initials || "NA"}
                    </div>
                )}

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                    <div className="flex items-center text-gray-600 gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>{dev.country || "Not provided"}</span>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-green-700">Contact</h2>
                <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>{dev.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{dev.mobile || "Not provided"}</span>
                </div>
            </div>

            {/* Bio */}
            <div>
                <h2 className="text-lg font-semibold text-green-700">Bio</h2>
                <p className="text-gray-700">{dev.bio || "-"}</p>
            </div>

            {/* Skills */}
            <div>
                <h2 className="text-lg font-semibold text-green-700">Skills</h2>
                {dev.skills && dev.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {dev.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">Not provided</p>
                )}
            </div>

            {/* Professional Info */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-medium text-gray-600">Category</h3>
                    <p>{formatString(dev.category ?? '') || "-"}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-600">Speciality</h3>
                    <p>{formatString(dev.speciality ?? '') || "-"}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-600">Experience Level</h3>
                    <p>{dev.experienceLevel || "-"}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-600">Hourly Rate</h3>
                    <p>
                        {dev.perHourRate ? `$${dev.perHourRate}/hr` : "Not available"}
                    </p>
                </div>
            </div>

            {/* Languages */}
            <div>
                <h2 className="text-lg font-semibold text-green-700">Languages</h2>
                <p className="text-gray-700">{dev.languages || "Not provided"}</p>
            </div>

            {/* Links */}
            <div>
                <h2 className="text-lg font-semibold text-green-700">Links</h2>
                <div className="flex flex-col gap-2">
                    {dev.portfolioLink ? (
                        <a
                            href={dev.portfolioLink}
                            target="_blank"
                            className="flex items-center gap-2 text-green-700 hover:underline"
                        >
                            <Globe className="w-4 h-4" />
                            Portfolio
                        </a>
                    ) : (
                        <p className="text-gray-700">Portfolio: Not provided</p>
                    )}
                    {dev.otherLink ? (
                        <a
                            href={dev.otherLink}
                            target="_blank"
                            className="flex items-center gap-2 text-green-700 hover:underline"
                        >
                            <LinkIcon className="w-4 h-4" />
                            Other Link
                        </a>
                    ) : (
                        <p className="text-gray-700">Other link: Not provided</p>
                    )}
                </div>
            </div>
        </div>
    );
}
