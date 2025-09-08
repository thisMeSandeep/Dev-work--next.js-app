"use client";

import { fetchProposalsAction } from "@/actions/developer.action";
import ProposalSkeleton from "@/components/loader/ProposalSkeleton";
import Drawer from "@/components/reusable/Drawer";
import { formatDate } from "@/lib/formatDate";
import { ProposalDTO } from "@/types/propoalDTO";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProposalDetails from "../components/ProposalDetails";
import { useProposalStore } from "@/store/proposalStore";
const Proposals = () => {
  const [proposalId, setproposalId] = useState<string | null>(null);

  const proposals = useProposalStore((state) => state.proposals);
  const loading = useProposalStore((state) => state.loading);



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
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-10 space-y-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-10">
          Your Proposals
        </h1>

        <p>{proposals?.length || 0} Proposals made.</p>

        {/* skeleton loader */}
        {loading ? (
          <div className="space-y-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProposalSkeleton key={index} />
            ))}

          </div>
        ) : (
          <div className="space-y-10">
            {proposals?.map((proposal) => (
              <div key={proposal.id} className="space-y-5">
                <div className="flex items-start gap-5 justify-between flex-col sm:flex-row">
                  <h1 className="text-2xl font-semibold">{proposal.job.title}</h1>
                  <p className="text-gray-500 ">Proposal submitted on {formatDate(proposal?.createdAt.toString())}</p>
                </div>
                <p className="text-gray-800 text-sm">{proposal.coverLetter}</p>
                <button onClick={() => handleDrawerOpen(proposal.id)} className="text-green-600 font-medium hover:underline cursor-pointer">View full details</button>
                <p>Status:<span className="text-gray-800 font-semibold">{proposal.status}</span></p>
              </div>
            ))}
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

export default Proposals;
