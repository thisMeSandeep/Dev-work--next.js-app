"use client";

import { MapPin } from "lucide-react";

const WorkCardSkeleton = () => {
  return (
    <div className="animate-pulse  p-5  bg-white ">
      {/* date */}
      <div className="h-3 w-20 bg-gray-200 rounded mb-2" />

      {/* title + heart */}
      <div className="flex items-start justify-between gap-4 mt-2">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>

      {/* meta */}
      <div className="h-3 w-40 bg-gray-200 rounded mt-3" />

      {/* description */}
      <div className="space-y-2 mt-4">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>

      {/* skills (pills placeholder) */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-12 bg-gray-200 rounded-full" />
      </div>

      {/* client info */}
      <div className="flex items-center gap-6 mt-5">
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-gray-300" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* proposals */}
      <div className="h-3 w-24 bg-gray-200 rounded mt-5" />
    </div>
  );
};

export default WorkCardSkeleton;
