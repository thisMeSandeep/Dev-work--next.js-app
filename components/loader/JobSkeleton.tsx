import React from "react";

const JobSkeleton = () => {
  return (
    <div className="border rounded-md p-6 shadow-sm animate-pulse">
      {/* Header */}
      <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left section */}
        <div className="space-y-4 flex-1">
          <div className="h-6 w-2/3 bg-gray-200 rounded"></div>

          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-2xl"></div>
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>

          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* Right section */}
        <div className="space-y-4 w-full md:w-[300px]">
          <div>
            <div className="h-5 w-24 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-32 bg-gray-100 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-24 bg-gray-100 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-20 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-28 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-2 flex-wrap">
          <div className="h-6 w-16 bg-gray-200 rounded-2xl"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-2xl"></div>
          <div className="h-6 w-12 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default JobSkeleton;
