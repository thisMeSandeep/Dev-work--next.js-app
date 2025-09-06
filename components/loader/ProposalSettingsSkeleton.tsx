function ProposalSettingsSkeleton() {
    return (
      <div className="animate-pulse">
        <div className="rounded-md border p-4 shadow-none">
          {/* Header */}
          <div className="mb-4">
            <div className="h-6 w-40 rounded bg-gray-300"></div>
          </div>
  
          {/* Content */}
          <div className="space-y-3">
            <div className="h-4 w-64 rounded bg-gray-300"></div>
            <div className="h-4 w-80 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProposalSettingsSkeleton;
  