import React from "react";

const JobDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 space-y-12 animate-pulse">
      {/* Job Header */}
      <header className="space-y-3">
        <div className="h-6 w-2/3 bg-gray-200 rounded-md"></div>
        <div className="flex gap-6">
          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </header>

      {/* Job Summary */}
      <section className="space-y-3">
        <div className="h-5 w-40 bg-gray-200 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
        </div>
      </section>

      {/* Price & Level */}
      <section className="flex flex-wrap gap-16 border-t border-gray-200 pt-8">
        <div className="space-y-2">
          <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </section>

      {/* Client Details */}
      <section className="border p-6 bg-white rounded-lg shadow-sm space-y-5">
        <div className="h-6 w-48 bg-gray-200 rounded-md"></div>

        <div className="space-y-2">
          <div className="h-5 w-36 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobDetailsSkeleton;
