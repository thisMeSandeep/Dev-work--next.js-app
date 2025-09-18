import { getHiredDeveloperForJobAction } from "@/actions/client.actions";
import { Card, CardContent } from "@/components/ui/card";
import { formatString } from "@/lib/formatString";
import Image from "next/image";

const HiredSection = async ({ jobId }: { jobId: string }) => {
  const res = await getHiredDeveloperForJobAction(jobId);
  if (!res.success || !res.profile) return null;
  const dev = res.profile;

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Hired Developer
      </h2>
      <Card className="shadow-none border rounded-xl">
        <CardContent className="p-4 flex items-center gap-4">
          {dev.user.profileImage ? (
            <Image
              width={56}
              height={56}
              src={dev.user.profileImage}
              alt={dev.user.firstName ?? "Developer"}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-medium">
              {(dev.user.firstName?.[0] ?? "") + (dev.user.lastName?.[0] ?? "")}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              {dev.user.firstName} {dev.user.lastName}
            </span>
            <span className="text-sm text-gray-600">{dev.user.email}</span>
            <span className="text-sm text-gray-600">
              {dev.user.country ?? "Not provided"}
            </span>
            <div className="text-sm text-gray-700 mt-1">
              {dev.category && (
                <span className="mr-2">{formatString(dev.category)}</span>
              )}
              {dev.speciality && <span>• {formatString(dev.speciality)}</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HiredSection;
