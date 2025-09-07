const ProposalSkeleton = () => {
    return (
        <div className="space-y-5 animate-pulse p-4">
            <div className="flex items-start gap-5 justify-between flex-col sm:flex-row">
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
            <div className="flex items-center gap-2">
                <div className="h-4 w-14 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
        </div>

    )
}

export default ProposalSkeleton