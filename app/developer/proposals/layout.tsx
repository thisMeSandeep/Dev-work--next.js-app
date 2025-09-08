"use client"

import { fetchAndSetProposals } from "@/lib/fetchProposals"
import { useEffect } from "react"


const ProposalLayout = ({ children }: { children: React.ReactNode }) => {


    useEffect(() => {
        fetchAndSetProposals();
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProposalLayout