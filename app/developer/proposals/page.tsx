"use client";

import ProposalSkeleton from "@/components/loader/ProposalSkeleton";
import Drawer from "@/components/reusable/Drawer";
import { formatDate } from "@/lib/formatDate";
import React, { useState } from "react";
import ProposalDetails from "../components/ProposalDetails";
import { useProposalStore } from "@/store/proposalStore";
import { Star, Clock, CheckCircle, XCircle, AlertCircle, DollarSign, Calendar } from "lucide-react";

const ProposalsList = () => {
  const [proposalId, setproposalId] = useState<string | null>(null);

  const proposals = useProposalStore((state) => state.proposals);
  const loading = useProposalStore((state) => state.loading);

  // Status configuration for better visual representation
  const statusConfig = {
    PENDING: {
      icon: Clock,
      label: "Pending",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-500"
    },
    ACCEPTED: {
      icon: CheckCircle,
      label: "Accepted",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-500"
    },
    REJECTED: {
      icon: XCircle,
      label: "Rejected",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500"
    },
    WITHDRAWN: {
      icon: AlertCircle,
      label: "Withdrawn",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-500"
    }
  };



  //handle drawer open
  const handleDrawerOpen = (proposalId: string) => {
    setproposalId(proposalId);
  };

  // handle drawer close
  const handleDrawerClose = () => {
    setproposalId(null);
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-10 px-5 md:px-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Your Proposals
          </h1>
          
          {/* Proposal Statistics */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{proposals?.length || 0}</div>
              <div className="text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {proposals?.filter(p => p.status === "PENDING").length || 0}
              </div>
              <div className="text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {proposals?.filter(p => p.status === "ACCEPTED").length || 0}
              </div>
              <div className="text-gray-500">Accepted</div>
            </div>
          </div>
        </div>

        {/* skeleton loader */}
        {loading ? (
          <div className="space-y-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProposalSkeleton key={index} />
            ))}

          </div>
        ) : (
          <div className="space-y-6">
            {proposals?.map((proposal) => {
              const status = statusConfig[proposal.status as keyof typeof statusConfig];
              const StatusIcon = status?.icon || Clock;
              
              return (
                <div key={proposal.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">{proposal.job.title}</h2>
                        {proposal.status === "ACCEPTED" && (
                          <Star className="shrink-0 w-5 h-5 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>Submitted {formatDate(proposal.createdAt.toString())}</span>
                        </div>
                        {proposal.rate && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>${proposal.rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${status?.bgColor} ${status?.borderColor}`}>
                      <StatusIcon className={`w-4 h-4 ${status?.iconColor}`} />
                      <span className={`text-sm font-medium ${status?.color}`}>
                        {status?.label || proposal.status}
                      </span>
                    </div>
                  </div>

                  {/* Job Status */}
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Job Status: </span>
                    <span className={`text-sm font-medium ${
                      proposal.job.status === "OPEN" ? "text-green-600" :
                      proposal.job.status === "ONGOING" ? "text-blue-600" :
                      proposal.job.status === "COMPLETED" ? "text-gray-600" :
                      "text-red-600"
                    }`}>
                      {proposal.job.status}
                    </span>
                  </div>

                  {/* Cover Letter Preview */}
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm whitespace-pre-line line-clamp-3 leading-relaxed">
                      {proposal.coverLetter}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleDrawerOpen(proposal.id)} 
                    className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors"
                  >
                    View full details →
                  </button>
                </div>
              );
            })}
          </div>
        )
        }
      </div >

      {proposalId && (
        <Drawer isOpen={proposalId !== null} onClose={handleDrawerClose} headerTitle="Proposal details">
          <ProposalDetails proposalId={proposalId} />
        </Drawer>
      )}

    </>
  );
};

export default ProposalsList;
