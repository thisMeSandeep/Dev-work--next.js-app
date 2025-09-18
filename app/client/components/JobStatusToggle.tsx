"use client";

import { changeJobStatusAction } from "@/actions/client.actions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { JobStatus } from "@prisma/client";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const statuses = ["OPEN", "ONGOING", "CLOSED", "COMPLETED"] as const;

export function JobStatusToggle({
  jobId,
  currentStatus,
}: {
  jobId: string;
  currentStatus: JobStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (newStatus: JobStatus) => {
    if (!newStatus || newStatus === currentStatus) return;

    startTransition(async () => {
      const response = await changeJobStatusAction({
        jobId,
        status: newStatus,
      });
      if (response.success) {
        router.refresh();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <ToggleGroup
      type="single"
      defaultValue={currentStatus}
      onValueChange={handleStatusChange}
      className="gap-2 flex-wrap"
      disabled={isPending}
    >
      {statuses.map((status) => (
        <ToggleGroupItem
          key={status}
          value={status}
          className={`
            px-4 py-1 rounded-sm shadow-none text-sm font-medium transition-colors
            cursor-pointer border border-gray-200
            hover:bg-gray-100
            data-[state=on]:bg-green-600 data-[state=on]:text-white data-[state=on]:border-green-600
          `}
        >
          {status}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
