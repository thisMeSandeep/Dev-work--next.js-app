"use client";

import { getSuggestedDevProfileAction } from "@/actions/client.actions";
import { Category, Speciality } from "@/generated/prisma";
import { useEffect, useState } from "react";
import { FreelancerProfileCoreDTO, UserCoreDTO } from "@/types/CoreDTO";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatString } from "@/lib/formatString";
import Drawer from "@/components/reusable/Drawer";
import DevProfileView from "./DevProfileView";

type Props = {
  category: Category;
  speciality: Speciality;
};

type DevWithUser = FreelancerProfileCoreDTO & {
  user: UserCoreDTO;
};

const SuggestedDevs = ({ category, speciality }: Props) => {
  const [profiles, setProfiles] = useState<DevWithUser[]>([]);
  const [viewProfile, setViewProfile] = useState<DevWithUser | null>(null);

  // fetch suggested dev list
  const fetchSuggestedDevs = async () => {
    const response = await getSuggestedDevProfileAction({
      category,
      speciality,
    });
    if (response.success) {
      setProfiles(response.profiles ?? []);
    }
  };

  useEffect(() => {
    fetchSuggestedDevs();
  }, [category, speciality]);

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    if (!firstName && !lastName) return "NA";
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Suggested Developers
      </h2>

      <div className="flex items-center flex-wrap gap-8">
        {profiles.length === 0 && (
          <p className="text-sm text-gray-500">No suggested profiles found.</p>
        )}

        {profiles.map((dev: DevWithUser) => (
          <Card
            key={dev.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-none rounded-xl border "
          >
            <CardContent className="p-4 flex items-center space-x-4">
              {dev.user.profileImage ? (
                <img
                  src={dev.user.profileImage}
                  alt={dev.user.firstName ?? "Dev"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-medium">
                  {getInitials(dev.user.firstName, dev.user.lastName)}
                </div>
              )}

              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">
                  {dev.user.firstName} {dev.user.lastName}
                </span>
                <span className="text-sm text-gray-600">
                  {dev.user.country ?? "Not provided"}
                </span>
              </div>
            </CardContent>

            <CardContent className="px-4 pb-0">
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Category: </span>
                  {dev.category ? formatString(dev.category) : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Speciality: </span>
                  {dev.speciality ? formatString(dev.speciality) : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Rate: </span>
                  {dev.perHourRate ? `$${dev.perHourRate}/hr` : "N/A"}
                </p>
              </div>
            </CardContent>

            <CardFooter className="px-4 pt-2 pb-4">
              <Button
                onClick={() => setViewProfile(dev)}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl cursor-pointer"
              >
                View Full Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* open drawer  */}
      {viewProfile && (
        <Drawer
          isOpen={Boolean(viewProfile)}
          onClose={() => setViewProfile(null)}
          headerTitle="Dev profile"
        >
          <DevProfileView dev={viewProfile} />
        </Drawer>
      )}
    </section>
  );
};

export default SuggestedDevs;
