"use server";
import { prisma } from "@/lib/prisma";
import { JobDTO } from "@/types/customtypes";

interface GetJobsParams {
  category?: string; // filter by category
  speciality?: string; // filter by speciality
  search?: string; // search text
}

interface GetJobsResponse {
  jobs: JobDTO[];
}

export const getJobsAction = async ({
  category,
  speciality,
  search,
}: GetJobsParams): Promise<GetJobsResponse> => {
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

  // Fetch jobs using cursor
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

  // Transform the Prisma result to match JobData interface
  const transformedJobs: JobDTO[] = jobs.map((job: any) => ({
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
        password: job.client.user.password,
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
