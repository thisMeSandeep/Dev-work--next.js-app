"use state"

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatDate";
import { formatString } from "@/lib/formatString";
import { Calendar, CircleDot, Wallet, FileText, MessageSquare, DollarSign, Clock, Paperclip, CheckCircle2, FileX, X, Pencil, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";
import ProposalForm from "./ProposalForm";
import { withdrawProposalAction } from "@/actions/developer.action";
import toast from "react-hot-toast";
import { fetchAndSetProposals } from "@/lib/fetchProposals";
import { useProposalStore } from "@/store/proposalStore";
import CollapsibleText from "@/components/reusable/CollapsibleText";
import Link from "next/link";



type ProposalProps = {
    proposalId: string;
}

const ProposalDetails = ({ proposalId }: ProposalProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const proposal = useProposalStore(state => state.getProposalById(proposalId));

    if (!proposal) return <p>No proposal found</p>;


    // withdraw proposal
    const withdrawProposal = async () => {
        setLoading(true);
        const response = await withdrawProposalAction(proposal.id);
        if (response.success) {
            toast.success(response.message);

        } else {
            toast.error(response.message ?? "Something went wrong");
        }
        await fetchAndSetProposals();
        setLoading(false);
    };

    return (
        <div className="space-y-10">

            <p className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} className="text-gray-400" />
                Applied on{" "}
                <span className="font-medium text-gray-700">
                    {formatDate(proposal.submittedAt.toString())}
                </span>
            </p>

            {/* job details */}
            <div className="space-y-4">
                <h1 className="text-xl font-semibold text-gray-800">
                    {proposal.job.title}
                </h1>

                <CollapsibleText text={proposal.job.description} />

                <div className="flex items-center gap-6 text-sm">
                    {/* Budget */}
                    <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                        <Wallet size={16} className="text-gray-500" />
                        <span className="font-medium">${proposal.job.budget}</span>
                    </span>

                    {/* Status */}
                    <span
                        className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium ${proposal.job.status === "OPEN"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        <CircleDot size={16} />
                        {proposal.job.status}
                    </span>
                </div>

                <Link
                    href={`/job/?_id=${proposal.job.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 flex items-center gap-2 text-sm"
                >
                    <ExternalLink />
                    Open Job in a new Window
                </Link>
            </div>


            {/* proposal details */}
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Proposal Details</h1>
                    <hr className="mt-2" />
                </div>

                {/* Cover Letter */}
                <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText size={16} className="text-gray-500" /> Cover Letter
                    </p>
                    <CollapsibleText text={proposal.coverLetter} />
                </div>

                {/* Message */}
                <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <MessageSquare size={16} className="text-gray-500" /> Message
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {proposal.message || "No message"}
                    </p>
                </div>

                {/* Rate & Duration */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <span className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        <DollarSign size={16} className="text-gray-500" /> Proposed rate:{" "}
                        <span className="font-medium">{proposal?.rate || "Not provided"}</span>
                    </span>
                    <span className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        <Clock size={16} className="text-gray-500" /> Proposed duration:{" "}
                        <span className="font-medium">{proposal.duration ? formatString(proposal.duration) : "Not provided"}</span>
                    </span>
                </div>

                {/* Attached File */}
                <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Paperclip size={16} className="text-gray-500" /> Attached File
                    </p>
                    {proposal.attachedFile ? (
                        <a
                            href={proposal.attachedFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline text-sm font-medium flex items-center gap-1"
                        >
                            <FileText size={14} /> Open file
                        </a>
                    ) : (
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            <FileX size={14} /> No attached file
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${proposal.status === "ACCEPTED"
                            ? "bg-green-100 text-green-700"
                            : proposal.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        <CheckCircle2 size={16} /> {proposal.status}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {proposal.status === "PENDING" && (
                        <>
                            <Button
                                onClick={withdrawProposal}
                                variant="destructive"
                                className="w-full sm:w-auto cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Withdraw proposal"
                                )}
                            </Button>

                            <Button
                                onClick={() => setIsEdit((prev) => !prev)}
                                variant="outline"
                                className="w-full sm:w-auto flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                            >
                                {isEdit ? (
                                    <>
                                        <X size={16} className="text-red-500" />
                                        Cancel edit
                                    </>
                                ) : (
                                    <>
                                        <Pencil size={16} className="text-green-500" />
                                        Edit proposal
                                    </>
                                )}
                            </Button>
                        </>
                    )}

                    {proposal.status === "WITHDRAWN" && (
                        <Button
                            onClick={() => setIsEdit((prev) => !prev)}
                            variant="outline"
                            className="w-full sm:w-auto flex items-center gap-2 justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                        >
                            {isEdit ? (
                                <>
                                    <X size={16} className="text-red-500" />
                                    Cancel edit
                                </>
                            ) : (
                                <>
                                    <Pencil size={16} className="text-green-500" />
                                    Edit proposal
                                </>
                            )}
                        </Button>
                    )}
                </div>

            </div>

            {/* proposal form */}
            <div>
                {isEdit && <ProposalForm proposalId={proposalId} />}
            </div>
        </div>
    )
}

export default ProposalDetails