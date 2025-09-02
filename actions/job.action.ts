"use server";
import { prisma } from "@/lib/prisma";

interface GetJobsParams {
  cursor?: string; // last job ID from previous fetch
  category?: string; // filter by category
  speciality?: string; // filter by speciality
  search?: string; // search text
  take?: number; // number of jobs to fetch at a time
}

export async function getJobs({
  cursor,
  category,
  speciality,
  search,
  take = 10,
}: GetJobsParams) {
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
    take,
    skip: cursor ? 1 : 0, // skip the cursor itself if present
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        include: {
          user: true,
        },
      },
    },
  });

  // Prepare next cursor
  const nextCursor = jobs.length > 0 ? jobs[jobs.length - 1].id : null;

  return {
    jobs,
    nextCursor,
  };
}
