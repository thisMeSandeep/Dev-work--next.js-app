import type {
  Category,
  Speciality,
  JobStatus,
  ScopeSize,
  ScopeDuration,
  ExperienceLevel,
} from "@prisma/client";

export interface ClientUserDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  country: string | null;
  role: string;
  profileImage: string | null;
}

export interface ClientProfileDTO {
  id: string;
  userId: string;
  mobile: string | null;
  company: string | null;
  websiteLink: string | null;
  rating: number | null;
  user: ClientUserDTO;
}

export interface JobDTO {
  id: string;
  title: string;
  description: string;
  category: Category;
  speciality: Speciality;
  skills: string[];
  budget: number;
  status: JobStatus;
  numberOfProposals: number;
  scopeSize: ScopeSize;
  duration: ScopeDuration;
  experienceRequired: ExperienceLevel;
  connectsRequired: number;
  attachment: string | null;
  createdAt: string;
  clientId: string;
  client: ClientProfileDTO;
}
