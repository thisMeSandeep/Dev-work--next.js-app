import {
  Role,
  ExperienceLevel,
  Category,
  Speciality,
  JobStatus,
  ScopeSize,
  ScopeDuration,
  ProposalStatus,
  EstimatedDuration,
  ClientRequestStatus,
} from "@/generated/prisma";

// ---------- MODELS ----------
export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  password?: string | null;
  country?: string | null;
  role: Role;
  profileImage?: string | null;
  authProviderId?: string | null;
  createdAt: Date;

  // Relations
  FreelancerProfile?: FreelancerProfile ;
  ClientProfile?: ClientProfile ;
}

export interface FreelancerProfile {
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

  // Relations
  user: User;
  savedJobs: Job[];
  proposals: Proposal[];
  hiredJobs: Job[];
  clientRequests: ClientRequest[];
}

export interface ClientProfile {
  id: string;
  userId: string;
  mobile?: string | null;
  company?: string | null;
  websiteLink?: string | null;
  rating?: number | null;
  jobsPosted?: number | null;
  jobsHired?: number | null;

  // Relations
  user: User;
  postedJobs: Job[];
  clientRequests: ClientRequest[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: Category;
  speciality: Speciality;
  skills: string[];
  budget: number;
  status: JobStatus;
  numberOfProposals: number;
  completed: boolean;

  scopeSize: ScopeSize;
  duration: ScopeDuration;
  experienceRequired: ExperienceLevel;
  connectsRequired: number;
  attachment?: string | null;
  createdAt: Date;

  // Relations
  clientId: string;
  client: ClientProfile;

  hiredFreelancerId?: string | null;
  hiredFreelancer?: FreelancerProfile | null;

  proposals: Proposal[];
  savedBy: FreelancerProfile[];
  clientRequests: ClientRequest[];
}

export interface Proposal {
  id: string;
  coverLetter: string;
  message?: string | null;
  rate: number;
  duration: EstimatedDuration;
  attachedFile?: string | null;
  createdAt: Date;
  status: ProposalStatus;
  submittedAt: Date;

  // Relations
  freelancerProfileId: string;
  freelancerProfile: FreelancerProfile;

  jobId: string;
  job: Job;
}

export interface ClientRequest {
  id: string;
  message?: string | null;
  createdAt: Date;
  status: ClientRequestStatus;

  jobId: string;
  job: Job;

  clientId: string;
  client: ClientProfile;

  developerId: string;
  developer: FreelancerProfile;
}
