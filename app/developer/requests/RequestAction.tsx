"use client";

import React, { useState} from "react";
import { ClientRequestStatus } from "@prisma/client";
import { User, X } from "lucide-react";
import { setRequestStatusAction } from "@/actions/developer.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RequestActionsProps {
    requestId: string;
}

const RequestActions= ({ requestId }:RequestActionsProps) => {
    const [loading, setLoading] = useState<ClientRequestStatus | null>(null);

    const router =useRouter()

    const handleAction = async (status: ClientRequestStatus) => {
        try {
            setLoading(status);
            const res = await setRequestStatusAction(requestId, status);

            if (!res.success) {
                 toast.error(res.message);
            } else {
                 router.refresh();
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
            <button
                onClick={() => handleAction("ACCEPTED")}
                disabled={loading !== null}
                className="px-4 py-2 text-sm rounded-2xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 w-full sm:w-auto flex items-center justify-center gap-1"
            >
                <User size={16} />
                {loading === "ACCEPTED" ? "Accepting..." : "Accept"}
            </button>

            <button
                onClick={() => handleAction("REJECTED")}
                disabled={loading !== null}
                className="px-4 py-2 text-sm rounded-2xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 w-full sm:w-auto flex items-center justify-center gap-1"
            >
                <X size={16} />
                {loading === "REJECTED" ? "Rejecting..." : "Reject"}
            </button>
        </div>
    );
};

export default RequestActions;
