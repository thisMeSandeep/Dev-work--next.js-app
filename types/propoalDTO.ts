import {
  ProposalStatus,
  EstimatedDuration,
  JobStatus,
} from "@/generated/prisma";

export interface JobPreviewDTO {
  id: string;
  title: string;
  description: string; 
  budget: number;
  status: JobStatus;
  createdAt: Date;
}

export interface ProposalDTO {
  id: string;
  coverLetter: string;
  message: string | null;
  rate: number | null;
  duration: EstimatedDuration | null;
  attachedFile: string | null;
  createdAt: Date;
  status: ProposalStatus;
  submittedAt: Date;
  job: JobPreviewDTO;
}
