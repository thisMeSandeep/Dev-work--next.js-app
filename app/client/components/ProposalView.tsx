"use client";

import { formatDate } from "@/lib/formatDate";
import { formatString } from "@/lib/formatString";
import { FreelancerProfileCoreDTO, ProposalCoreDTO, UserCoreDTO } from "@/types/CoreDTO";
import { FileText, User, MapPin } from "lucide-react";
import { acceptProposalAction, rejectProposalAction } from "@/actions/client.actions";
import LoadingButton from "@/components/loader/LoadingButton";
import { useState } from "react";
import toast from "react-hot-toast";

type ProposalWithUser = ProposalCoreDTO & {
  freelancerProfile: FreelancerProfileCoreDTO & {
    user: UserCoreDTO;
  };
};

const ProposalView = ({ proposal }: { proposal: ProposalWithUser }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [proposalStatus, setProposalStatus] = useState(proposal.status);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const response = await acceptProposalAction(proposal.id);
      if (response.success) {
        toast.success(response.message);
        setProposalStatus("ACCEPTED");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const response = await rejectProposalAction(proposal.id);
      if (response.success) {
        toast.success(response.message);
        setProposalStatus("REJECTED");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRejecting(false);
    }
  };

  const isProcessed = proposalStatus !== "PENDING";

  return (
    <div className="relative flex flex-col ">
      {/* Header */}
      <div className="border-b p-4 md:p-6  mb-4">
        <p className="text-xl md:text-2xl font-semibold text-gray-900">
          Proposed on {formatDate(proposal.createdAt.toString())}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-1">
          <User size={16} className="text-green-600" />
          <span className="font-medium">
            {proposal.freelancerProfile.user.firstName +
              " " +
              proposal.freelancerProfile.user.lastName}
          </span>
          <span className="text-gray-400">•</span>
          <MapPin size={14} className="text-green-600" />
          <span>{proposal.freelancerProfile.user.country}</span>
        </div>
        <div className="flex gap-3 mt-2">
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            {proposal.freelancerProfile?.category
              ? formatString(proposal.freelancerProfile.category)
              : "-"}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            {proposal.freelancerProfile?.speciality
              ? formatString(proposal.freelancerProfile.speciality)
              : "-"}
          </span>
        </div>
      </div>

      {/* Proposal Details */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Status */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">Status</p>
          <div className="flex items-center gap-2">
            <p className={`font-medium ${
              proposalStatus === "ACCEPTED" 
                ? "text-green-600" 
                : proposalStatus === "REJECTED" 
                ? "text-red-600" 
                : "text-yellow-600"
            }`}>
              {proposalStatus}
            </p>
            {proposalStatus === "ACCEPTED" && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Hired
              </span>
            )}
          </div>
        </div>

        {/* Cover letter */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">
            Cover Letter
          </p>
          <p className="text-gray-700 mt-1 leading-relaxed whitespace-pre-line">
            {proposal.coverLetter}
          </p>
        </div>

        {/* Message */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">Message</p>
          <p className="text-gray-700 mt-1 leading-relaxed">
            {proposal.message ?? "-"}
          </p>
        </div>

        {/* Rate and Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl">
            <p className="text-sm text-gray-500 font-medium">Proposed Bid</p>
            <p className="text-lg font-semibold text-gray-800">
              ${proposal.rate}
            </p>
          </div>
          <div className="p-4 border rounded-xl">
            <p className="text-sm text-gray-500 font-medium">
              Proposed Duration
            </p>
            <p className="text-lg font-semibold text-gray-800">
               {formatString(proposal.duration)}
            </p>
          </div>
        </div>

        {/* Attached file */}
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Attached File
          </p>
          {proposal.attachedFile ? (
            <a
              href={proposal.attachedFile}
              target="_blank"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <FileText size={16} />
              Open file
            </a>
          ) : (
            <p className="text-gray-500">Not attached</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="sticky bottom-0 mt-5 bg-white py-4 border-t flex justify-end gap-4 px-4">
        {!isProcessed ? (
          <>
            <LoadingButton
              onClick={handleReject}
              isLoading={isRejecting}
              disabled={isAccepting || isRejecting}
              className="rounded-xl px-6 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Reject
            </LoadingButton>
            <LoadingButton
              onClick={handleAccept}
              isLoading={isAccepting}
              disabled={isAccepting || isRejecting}
              className="rounded-xl px-6 py-2 font-medium bg-green-600 hover:bg-green-700 text-white"
            >
              Accept
            </LoadingButton>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              {proposalStatus === "ACCEPTED" 
                ? "This proposal has been accepted" 
                : "This proposal has been rejected"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalView;
