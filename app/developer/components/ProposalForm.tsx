"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkle, UploadIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { estimatedDurationOptions } from "@/data/JobData";
import { proposalSchema } from "@/lib/schemas/proposal.schema";
import { ProposalSchemaType } from "@/lib/schemas/proposal.schema";
import { createProposalAction } from "@/actions/developer.action";
import toast from "react-hot-toast";
import { fetchAndSetUser } from "@/lib/fetchUser";

const inputStyles =
  "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";
const selectStyles =
  "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";

export default function ProposalForm({ jobId }: { jobId: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proposalSchema),
    mode: "onChange",
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProposalSchemaType) => {
    setLoading(true);
    const response = await createProposalAction(jobId, data);
    if (!response.success) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      reset();
      await fetchAndSetUser();
    }
    setLoading(false);
  };

  const watchedFile = watch("attachedFile");

  useEffect(() => {
    let url: string | null = null;
    if (
      watchedFile &&
      watchedFile instanceof FileList &&
      watchedFile.length > 0
    ) {
      const file = watchedFile[0];
      if (file.type === "application/pdf") {
        url = URL.createObjectURL(file);
        setFilePreview(url);
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [watchedFile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Cover Letter */}
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <div className="relative">
          <Textarea
            id="coverLetter"
            {...register("coverLetter")}
            className={inputStyles}
            style={{ minHeight: "300px" }}
          />
          <div className="absolute right-4 bottom-0">
            <Tooltip>
              <TooltipTrigger type="button" className="cursor-pointer">
                <Sparkle className="size-5 text-emerald-700" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enhance with AI</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {errors.coverLetter && (
          <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          {...register("message")}
          className={inputStyles}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      {/* Rate */}
      <div className="space-y-2">
        <Label htmlFor="rate">
          Rate (Optional - Your offered price for this job)
        </Label>
        <Input
          id="rate"
          type="number"
          step="0.01"
          {...register("rate")}
          className={inputStyles}
        />
        {errors.rate && (
          <p className="text-red-500 text-sm">{errors.rate.message}</p>
        )}
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration">
          Duration (Optional - Estimated time you can finish this job)
        </Label>
        <Select onValueChange={(val) => setValue("duration", val)}>
          <SelectTrigger className={selectStyles}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {estimatedDurationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration.message}</p>
        )}
      </div>

      {/* Attached File */}
      <div className="space-y-2">
        <div className="flex items-center gap-5">
          <p>Attached File (optional - Resume/CV, PDF only)</p>
          <Label
            htmlFor="attachedFile"
            className="flex items-center justify-center bg-green-500 p-5 rounded-full cursor-pointer"
          >
            <UploadIcon className="w-5 h-5 text-green-800" />
          </Label>
        </div>
        <Input
          id="attachedFile"
          type="file"
          accept=".pdf"
          {...register("attachedFile")}
          hidden
        />
        {filePreview && (
          <div className="mt-2">
            <p className="text-sm">Selected File Preview:</p>
            <embed
              src={filePreview}
              type="application/pdf"
              width="100%"
              height="200px"
            />
          </div>
        )}
        {typeof errors.attachedFile?.message === "string" && (
          <p className="text-red-500 text-sm">{errors.attachedFile.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Sending proposal..." : "Submit Proposal"}
      </Button>
    </form>
  );
}
