import { fetchProposalsAction } from "@/actions/developer.action";
import { useProposalStore } from "@/store/proposalStore";

export const fetchAndSetProposals = async () => {
  useProposalStore.getState().setLoading(true);
  const response = await fetchProposalsAction();
  if (response.success) {
    useProposalStore.getState().setProposal(response.proposals);
  } else {
    useProposalStore.getState().setProposal([]);
    console.log("error in getting proposals:", response.message);
  }
  useProposalStore.getState().setLoading(false);
};
