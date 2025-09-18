"use client";
import {
  FreelancerProfileCoreDTO,
  ProposalCoreDTO,
  UserCoreDTO,
} from "@/types/CoreDTO";
import { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { formatString } from "@/lib/formatString";
import { ExternalLink } from "lucide-react";
import Popup from "@/components/reusable/Popup";
import DeveloperProfile from "@/components/reusable/DeveloperProfile";
import ProposalView from "./ProposalView";

export type ProposalWithUser = ProposalCoreDTO & {
  freelancerProfile: FreelancerProfileCoreDTO & {
    user: UserCoreDTO;
  };
};

const ProposalsTable = ({ proposals }: { proposals: ProposalWithUser[] }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedProposal, setSelectedProposal] =
    useState<ProposalWithUser | null>(null);
  const [viewType, setViewType] = useState<"proposal" | "developer" | null>(
    null
  );

  const developerData = useMemo(
    () => ({
      firstName: selectedProposal?.freelancerProfile.user.firstName ?? "",
      lastName: selectedProposal?.freelancerProfile.user.lastName ?? "",
      email: selectedProposal?.freelancerProfile.user.email ?? "",
      country: selectedProposal?.freelancerProfile.user.country ?? null,
      profileImage:
        selectedProposal?.freelancerProfile.user.profileImage ?? null,

      mobile: selectedProposal?.freelancerProfile.mobile ?? null,
      bio: selectedProposal?.freelancerProfile.bio ?? null,
      skills: selectedProposal?.freelancerProfile.skills ?? [],
      category: selectedProposal?.freelancerProfile.category ?? null,
      speciality: selectedProposal?.freelancerProfile.speciality ?? null,
      experienceLevel:
        selectedProposal?.freelancerProfile.experienceLevel ?? null,
      perHourRate: selectedProposal?.freelancerProfile.perHourRate ?? null,
      languages: selectedProposal?.freelancerProfile.languages ?? null,
      portfolioLink: selectedProposal?.freelancerProfile.portfolioLink ?? null,
      otherLink: selectedProposal?.freelancerProfile.otherLink ?? null,
    }),
    [selectedProposal]
  );

  const onViewProposal = useCallback((proposal: ProposalWithUser) => {
    setSelectedProposal(proposal);
    setViewType("proposal");
    setOpenPopup(true);
  }, []);

  const onViewDeveloper = useCallback((proposal: ProposalWithUser) => {
    setSelectedProposal(proposal);
    setViewType("developer");
    setOpenPopup(true);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-5">
        Proposals received for this job
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Developer</TableHead>
            <TableHead>Proposal Date</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead>Bid</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Proposal Status</TableHead>
            <TableHead>Proposal Details</TableHead>
            <TableHead>Developer Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>
                {proposal.freelancerProfile.user.firstName +
                  " " +
                  proposal.freelancerProfile.user.lastName}
              </TableCell>
              <TableCell>{formatDate(proposal.createdAt.toString())}</TableCell>
              <TableCell>
                {proposal.freelancerProfile.user.country ?? "-"}
              </TableCell>
              <TableCell>
                {proposal.freelancerProfile.experienceLevel}
              </TableCell>
              <TableCell>
                {formatString(proposal.freelancerProfile.speciality as string)}
              </TableCell>
              <TableCell>{proposal.rate ?? "-"}</TableCell>
              <TableCell>{formatString(proposal.duration)}</TableCell>
              <TableCell>{proposal.status}</TableCell>
              <TableCell>
                <button
                  onClick={() => onViewProposal(proposal)}
                  className=" flex items-center gap-2  hover:text-green-500 hover:underline cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => onViewDeveloper(proposal)}
                  className=" flex items-center gap-2  hover:text-green-500 hover:underline cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* popup */}
      {openPopup && (
        <Popup
          headerTitle={
            viewType === "developer" ? "Developer Profile" : "Proposal Details"
          }
          onClose={() => {
            setOpenPopup(false);
            setViewType(null);
            setSelectedProposal(null);
          }}
        >
          {viewType === "developer" && selectedProposal && (
            <DeveloperProfile dev={developerData} />
          )}

          {viewType === "proposal" && selectedProposal && (
            <ProposalView proposal={selectedProposal} />
          )}
        </Popup>
      )}
    </div>
  );
};

export default ProposalsTable;
