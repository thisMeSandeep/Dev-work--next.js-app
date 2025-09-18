"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/server-utils";
import { JobWithClient } from "@/types/type";
import { unstable_cache } from "next/cache";

// -------------------get jobs---------------------
export const getAllJobsAction = async () => {
  try {
    const getOpenJobsCached = unstable_cache(
      async () => {
        const jobs = await prisma.job.findMany({
          where: { status: "OPEN" },
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
        return jobs;
      },
      ["open-jobs"],
      { tags: ["jobs:open"] }
    );

    const jobs = await getOpenJobsCached();

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
      createdAt: job.createdAt,
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
      success: true,
      jobs: transformedJobs,
    };
  } catch (error) {
    console.error("Error getting jobs:", error);
    return {
      success: false,
      message: "Something went wrong",
      jobs: [],
    };
  }
};

//--------------- get personalized jobs-------------
export const getPersonalizedJobsAction = async () => {
  const userId = await getUserId();
  if (!userId) {
    return {
      success: false,
      message: "User not authenticated",
      jobs:[],
    };
  }

  try {
    // Get freelancer info
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true, category: true, speciality: true, skills: true },
    });

    if (!freelancer) {
      return {
        success: false,
        message: "Freelancer profile not found",
        jobs:[],
      };
    }

    // Build dynamic filters
    const where: any = {
      status: "OPEN",
      ...(freelancer.category && { category: freelancer.category }),
      ...(freelancer.speciality && { speciality: freelancer.speciality }),
      ...(freelancer.skills?.length
        ? { skills: { hasSome: freelancer.skills } }
        : {}),
    };

    // Fetch jobs (cached per user and preferences; invalidated with jobs:open)
    const key = [
      "personalized-jobs",
      userId,
      String(freelancer.category ?? ""),
      String(freelancer.speciality ?? ""),
      ...(Array.isArray(freelancer.skills) ? [...freelancer.skills].sort() : []),
    ];

    const getPersonalizedCached = unstable_cache(
      async (whereArg: any) => {
        const jobs = await prisma.job.findMany({
          where: whereArg,
          orderBy: { createdAt: "desc" },
          include: {
            client: {
              include: {
                user: true,
              },
            },
          },
        });
        return jobs;
      },
      key as any,
      { tags: ["jobs:open", `user:${userId}:personalized`] }
    );

    const jobs = await getPersonalizedCached(where);

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
      createdAt: job.createdAt,
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
      success: true,
      jobs: transformedJobs,
    };
  } catch (err) {
    console.error("Error fetching personalized jobs:", err);
    return {
      success: false,
      message: "Something went wrong",
      jobs:[],
    };
  }
};

//---------------------get a job--------------------
export const getJobDetailsAction = async (jobId: string) => {
  if (!jobId) {
    return {
      success: false,
      message: "Job Id not Found",
    };
  }

  // fetch job (cached by job id; invalidated via job tag)
  const getJobDetailsCached = unstable_cache(
    async (id: string) => {
      const job = await prisma.job.findUnique({
        where: {
          id,
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
      return job;
    },
    ["job-details", jobId],
    { tags: ["job:" + jobId] }
  );

  const job = await getJobDetailsCached(jobId);

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
