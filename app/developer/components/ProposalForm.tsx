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
import { Sparkle, UploadIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { estimatedDurationOptions } from "@/data/JobData";
import { proposalSchema } from "@/lib/schemas/proposal.schema";
import { ProposalSchemaType } from "@/lib/schemas/proposal.schema";
import { createProposalAction, updateProposalAction } from "@/actions/developer.action";
import toast from "react-hot-toast";
import { fetchAndSetProposals } from "@/lib/fetchProposals";
import { useProposalStore } from "@/store/proposalStore";
import LoadingButton from "@/components/loader/LoadingButton";
import { useEnhanceText } from "@/hooks/useEnhanceText";




interface ProposalFormProps {
  jobId?: string;
  proposalId?: string;
}

const inputStyles =
  "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";
const selectStyles =
  "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";

export default function ProposalForm({
  jobId,
  proposalId,
}: ProposalFormProps) {


  // fetch proposal details
  const proposal = useProposalStore((state) => state.getProposalById(proposalId || ""));

  const proposalDetails = {
    id: proposal?.id,
    coverLetter: proposal?.coverLetter || "",
    message: proposal?.message || undefined,
    rate: proposal?.rate || undefined,
    duration: proposal?.duration || undefined
  }


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      coverLetter: proposalDetails?.coverLetter,
      message: proposalDetails?.message,
      rate: proposalDetails?.rate,
      duration: proposalDetails?.duration
    },
    mode: "onChange",
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { enhance, loading: enhancingCover } = useEnhanceText();

  const handleEnhanceCoverLetter = async () => {
    const current = getValues("coverLetter") || "";
    const trimmed = (current as string).trim();
    if (!trimmed || enhancingCover) {
      if (!trimmed) toast.error("Please write something to enhance.");
      return;
    }
    const result = await enhance(trimmed, { tone: "persuasive" });
    if (typeof result === "string" && result.length > 0) {
      setValue("coverLetter", result, { shouldValidate: true, shouldDirty: true });
      toast.success("Enhanced with AI");
    } else {
      toast.error("Failed to enhance text. Please try again.");
    }
  };


  const onSubmit = async (data: ProposalSchemaType) => {
    setLoading(true);
    let response;

    if (proposalDetails?.id) {
      // Update scenario
      response = await updateProposalAction(proposalDetails.id, data);
    } else if (jobId) {
      // Create scenario
      response = await createProposalAction(jobId, data);
    } else {
      toast.error("Cannot submit proposal: Missing job information.");
      setLoading(false);
      return;
    }
    if (!response.success) {
      toast.error(response.message);
    } else {
      await fetchAndSetProposals();
      toast.success(response.message);
      reset();
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
              <TooltipTrigger
                type="button"
                className="cursor-pointer"
                onClick={handleEnhanceCoverLetter}
                aria-busy={enhancingCover}
              >
                {enhancingCover ? (
                  <span className="text-sm text-emerald-700">Enhancing...</span>
                ) : (
                  <Sparkle className="size-5 text-emerald-700" />
                )}
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
          Rate (Your offered price for this job)
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
      <div className="space-y-2 relative">
        <Label htmlFor="duration">
          Duration (Estimated time you can finish this job)
        </Label>
        <Select value={getValues("duration")} onValueChange={(val) => setValue("duration", val)} >
          <SelectTrigger className={selectStyles}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="z-10000">
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
            className="flex items-center justify-center bg-green-500 p-5 rounded-full cursor-pointer group"
          >
            <UploadIcon className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
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
      <div className="w-full sm:w-[250px]">
        <LoadingButton
          type="submit"
          isLoading={loading}
          disabled={loading}
        >
          {loading ? "Sending proposal..." : "Submit Proposal"}
        </LoadingButton>
      </div>
    </form>
  );
}
