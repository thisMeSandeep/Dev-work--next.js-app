import {
  ExperienceLevel,
  Category,
  Speciality,
  JobStatus,
  ScopeSize,
  ScopeDuration,
  ProposalStatus,
  EstimatedDuration,
  ClientRequestStatus,
  Role,
} from "@prisma/client";

// ------------------ Core DTOs ------------------

// User
export interface UserCoreDTO {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  role: Role;
  email: string;
  country?: string | null;
  profileImage?: string | null;
}

// FreelancerProfile
export interface FreelancerProfileCoreDTO {
  id: string;
  userId: string;
  available: boolean;
  mobile?: string | null;
  bio?: string | null;
  skills: string[];
  category?: Category | null;
  speciality?: Speciality | null;
  experienceLevel?: ExperienceLevel | null;
  perHourRate?: number | null;
  languages?: string | null;
  connects: number;
  portfolioLink?: string | null;
  otherLink?: string | null;
  file?: string | null;
  jobsApplied?: number | null;
  totalJobsHired?: number | null;
  totalIncome?: number | null;
}

// ClientProfile
export interface ClientProfileCoreDTO {
  id: string;
  userId: string;
  mobile?: string | null;
  company?: string | null;
  websiteLink?: string | null;
  rating?: number | null;
  jobsPosted?: number | null;
  jobsHired?: number | null;
  totalSpent?: number | null;
}

// Job
export interface JobCoreDTO {
  id: string;
  title: string;
  description: string;
  category: Category;
  speciality: Speciality;
  skills: string[];
  budget: number;
  status: JobStatus;
  numberOfProposals: number;
  completed?: boolean;
  scopeSize: ScopeSize;
  duration: ScopeDuration;
  experienceRequired: ExperienceLevel;
  connectsRequired: number;
  attachment?: string | null;
  createdAt: Date;
  clientId: string;
  hiredFreelancerId?: string | null;

}

// Proposal
export interface ProposalCoreDTO {
  id: string;
  coverLetter: string;
  message?: string | null;
  rate: number;
  duration: EstimatedDuration;
  attachedFile?: string | null;
  createdAt: Date;
  status: ProposalStatus;
  submittedAt: Date;
  freelancerProfileId: string;
  jobId: string;
}

// ClientRequest
export interface ClientRequestCoreDTO {
  id: string;
  message?: string | null;
  createdAt: Date;
  status: ClientRequestStatus;
  jobId: string;
  clientId: string;
  developerId: string;
}
