"use server";
import { prisma } from "@/lib/prisma";
import { JobWithClient } from "@/types/type";

interface GetJobsParams {
  category?: string; // filter by category
  speciality?: string; // filter by speciality
  search?: string; // search text
}

// -------------------get jobs---------------------
export const getJobsAction = async ({
  category,
  speciality,
  search,
}: GetJobsParams) => {
  // Build where clause
  const where: any = {
    status: "OPEN",
    ...(category && { category }),
    ...(speciality && { speciality }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { speciality: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  // Fetch jobs
  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    omit: {
      hiredFreelancerId: true,
      completed: true,
    },
    include: {
      client: {
        include: {
          user: true,
        },
      },
    },
  });

  const transformedJobs: JobWithClient[] = jobs.map((job: any) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    category: job.category,
    speciality: job.speciality,
    skills: job.skills,
    budget: job.budget,
    status: job.status,
    numberOfProposals: job.numberOfProposals,
    scopeSize: job.scopeSize,
    duration: job.duration,
    experienceRequired: job.experienceRequired,
    connectsRequired: job.connectsRequired,
    attachment: job.attachment,
    createdAt: job.createdAt.toISOString(),
    clientId: job.clientId,
    client: {
      id: job.client.id,
      userId: job.client.userId,
      mobile: job.client.mobile,
      company: job.client.company,
      websiteLink: job.client.websiteLink,
      rating: job.client.rating,
      user: {
        id: job.client.user.id,
        firstName: job.client.user.firstName,
        lastName: job.client.user.lastName,
        email: job.client.user.email,
        country: job.client.user.country,
        role: job.client.user.role,
        profileImage: job.client.user.profileImage,
      },
    },
  }));

  return {
    jobs: transformedJobs,
  };
};

//---------------------get a job--------------------
export const getJobDetailsAction = async (jobId: string) => {
  if (!jobId) {
    return {
      success: false,
      message: "Job Id not Found",
    };
  }

  // fetch job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    omit: {
      hiredFreelancerId: true,
      completed: true,
    },
    include: {
      client: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!job) {
    return {
      success: false,
      message: "Job not Found",
    };
  }

  const transformedJob: JobWithClient = {
    id: job.id,
    title: job.title,
    description: job.description,
    category: job.category,
    speciality: job.speciality,
    skills: job.skills,
    budget: job.budget,
    status: job.status,
    numberOfProposals: job.numberOfProposals,
    scopeSize: job.scopeSize,
    duration: job.duration,
    experienceRequired: job.experienceRequired,
    connectsRequired: job.connectsRequired,
    attachment: job.attachment,
    createdAt: job.createdAt,
    clientId: job.clientId,
    client: {
      id: job.client.id,
      userId: job.client.userId,
      mobile: job.client.mobile,
      company: job.client.company,
      websiteLink: job.client.websiteLink,
      rating: job.client.rating,
      jobsPosted: job.client.jobsPosted,
      jobsHired: job.client.jobsHired,
      user: {
        id: job.client.user.id,
        firstName: job.client.user.firstName,
        lastName: job.client.user.lastName,
        email: job.client.user.email,
        role: job.client.user.role,
        country: job.client.user.country,
        profileImage: job.client.user.profileImage,
      },
    },
  };

  return {
    success: true,
    job: transformedJob,
  };
};
