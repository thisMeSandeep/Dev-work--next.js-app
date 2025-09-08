import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ProposalDTO } from "@/types/propoalDTO";

interface ProposalState {
    proposals: ProposalDTO[] | null;
    setProposal: (proposals: ProposalDTO[] | null) => void;
    clearProposal: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    getProposalById: (id: string) => ProposalDTO | undefined;
}

export const useProposalStore = create<ProposalState>()(
    devtools(
        (set, get) => ({
            proposals: null,
            loading: false,
            setProposal: (proposals) => set({ proposals }),
            setLoading: (loading) => set({ loading }),
            clearProposal: () => set({ proposals: null }),
            getProposalById: (id: string) => get().proposals?.find(p => p.id === id),
        }),
        { name: "ProposalStore" }
    )
);

