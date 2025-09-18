"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { getUserId } from "@/lib/server-utils";
import { uploadFile } from "@/lib/uploadFile";
import {
  clientDataSchema,
  ClientDataType,
  jobSchema,
} from "@/lib/validationSchema";
import { JobSchemaType } from "@/lib/validationSchema";
import {
  ExperienceLevel,
  Category,
  Speciality,
  ScopeSize,
  ScopeDuration,
  JobStatus,
} from "@prisma/client";
import {
  FreelancerProfileCoreDTO,
  JobCoreDTO,
  ProposalCoreDTO,
  UserCoreDTO,
} from "@/types/CoreDTO";
import { success } from "zod";

// ------------- Set client profile---------------
export const setClientProfileAction = async (data: ClientDataType) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const result = clientDataSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    const { country, mobile, company, websiteLink } = result.data;

    // Save country in user model
    await prisma.user.update({
      where: { id: userId },
      data: { country },
    });

    // generate a free rating for client between 3 to 5
    const rating = +(Math.random() * (5 - 3) + 3).toFixed(1);

    await prisma.clientProfile.update({
      where: { userId },
      data: {
        mobile,
        company,
        websiteLink: websiteLink === "" ? null : websiteLink,
        rating,
      },
    });

    return { success: true, message: "Client profile saved" };
  } catch (err: any) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
};

// -------------- get single job by id (for current client scope) -----------
export const getJobByIdAction = async (jobId: string) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // Ensure job belongs to current client
    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!client) {
      return { success: false, message: "Client profile not found" };
    }

    const job = await prisma.job.findFirst({
      where: { id: jobId, clientId: client.id },
    });

    if (!job) {
      return { success: false, message: "Job not found" };
    }

    return { success: true, job };
  } catch (err) {
    console.error("Error fetching job:", err);
    return { success: false, message: "Something went wrong" };
  }
};

// -------------- get hired developer profile for a job -----------
export const getHiredDeveloperForJobAction = async (jobId: string) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { hiredFreelancerId: true },
    });

    if (!job || !job.hiredFreelancerId) {
      return { success: false, message: "No hired developer for this job" };
    }

    const profile = await prisma.freelancerProfile.findUnique({
      where: { id: job.hiredFreelancerId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            country: true,
            email: true,
            role: true,
            profileImage: true,
          },
        },
      },
    });

    if (!profile) {
      return { success: false, message: "Hired developer profile not found" };
    }

    return { success: true, profile };
  } catch (err) {
    console.error("Error fetching hired developer:", err);
    return { success: false, message: "Something went wrong" };
  }
};

// -------------- create job -----------
export const createJobAction = async (data: JobSchemaType) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // Get client profile for the logged-in user
    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      return { success: false, message: "Client profile not found" };
    }

    // Validate input
    const result = jobSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    const {
      title,
      description,
      category,
      speciality,
      skills,
      budget,
      scopeSize,
      duration,
      experienceRequired,
      connectsRequired,
      attachment,
    } = result.data;

    // Upload attachment if present
    let fileUrl: string | null = null;
    if (attachment) {
      try {
        fileUrl = await uploadFile(attachment, "attachments");
      } catch (err) {
        return {
          success: false,
          message: "Error uploading attachment, please try again",
        };
      }
    }

    await prisma.$transaction(async (tx) => {
      // Create job
      const job = await tx.job.create({
        data: {
          title,
          description,
          category: category as Category,
          speciality: speciality as Speciality,
          skills,
          budget,
          scopeSize: scopeSize as ScopeSize,
          duration: duration as ScopeDuration,
          experienceRequired: experienceRequired as ExperienceLevel,
          connectsRequired,
          attachment: fileUrl,
          clientId: client.id,
        },
      });

      // Update posted job count
      await tx.clientProfile.update({
        where: { userId },
        data: {
          jobsPosted: { increment: 1 },
        },
      });
      return job;
    });

    // Revalidate client jobs cache and page so newly posted job appears immediately
    const clientForTag = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (clientForTag) {
      revalidateTag("client:" + clientForTag.id + ":jobs");
    }
    revalidatePath("/client/jobs");
    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (err) {
    console.error("Error creating job:", err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// -------------get all jobs posted by clients----------------
export const getPostedJobsAction = async () => {
  // extract client id
  const userId = await getUserId();
  if (!userId) {
    return {
      success: false,
      message: "User not authorized",
    };
  }
  try {
    // extract client data
    const client = await prisma.clientProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!client) {
      return {
        success: false,
        message: "Client profile not found",
      };
    }

    //  get all the posted jobs by client (cached with tag)
    const getClientJobsCached = unstable_cache(
      async (clientId: string) => {
        const jobs: JobCoreDTO[] = await prisma.job.findMany({
          where: { clientId },
          orderBy: { createdAt: "desc" },
        });
        return jobs;
      },
      ["client-jobs", client.id],
      { tags: ["client:" + client.id + ":jobs"] }
    );

    const jobs = await getClientJobsCached(client.id);

    return {
      success: true,
      jobs,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// -----------change job status----------------
export const changeJobStatusAction = async ({
  jobId,
  status,
}: {
  jobId: string;
  status: JobStatus;
}) => {
  const userId = await getUserId();
  if (!userId) {
    return {
      success: false,
      message: "User not authorized",
    };
  }

  try {
    // extract client data
    const client = await prisma.clientProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!client) {
      return {
        success: false,
        message: "Client profile not found",
      };
    }

    // change job status
    await prisma.job.update({
      where: { id: jobId, clientId: client.id },
      data: { status: status },
    });

    // Invalidate caches
    revalidateTag("job:" + jobId);
    revalidateTag("client:" + client.id + ":jobs");

    return {
      success: true,
      message: `Job status changed to ${status.toLowerCase()} `,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something",
    };
  }
};

// --------------get all the proposals for a job------------
export const getJobProposalsAction = async (jobId: string) => {
  try {
    const getProposalsCached = unstable_cache(
      async (id: string) => {
        const proposals: (ProposalCoreDTO & {
          freelancerProfile: FreelancerProfileCoreDTO & { user: UserCoreDTO };
        })[] = await prisma.proposal.findMany({
          where: { jobId: id },
          include: {
            freelancerProfile: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    country: true,
                    email: true,
                    profileImage: true,
                  },
                },
              },
            },
          },
        });
        return proposals;
      },
      ["job-proposals", jobId],
      { tags: ["job:" + jobId + ":proposals"] }
    );
    const proposals = await getProposalsCached(jobId);
    return { success: true, proposals };
  } catch (err) {
    console.error("Error fetching proposals:", err);
    return { success: false, message: "Something went wrong" };
  }
};

// ------------- get suggested dev profile action----------------
export const getSuggestedDevProfileAction = async ({
  category,
  speciality,
}: {
  category: Category;
  speciality: Speciality;
}) => {
  try {
    // get profiles (cached)
    const getSuggestedCached = unstable_cache(
      async (cat: Category, spec: Speciality) => {
        const profiles = await prisma.freelancerProfile.findMany({
          where: {
            category: cat,
            speciality: spec,
            NOT: [{ category: null }, { speciality: null }],
          },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                country: true,
                email: true,
                role: true,
                profileImage: true,
              },
            },
          },
        });
        return profiles;
      },
      ["suggested-devs", String(category), String(speciality)],
      { tags: ["suggested:" + String(category) + ":" + String(speciality)] }
    );
    const profiles = await getSuggestedCached(category, speciality);
    return {
      success: true,
      profiles,
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// ------------send request to dev------------------------
type Request = {
  message?: string;
  jobId: string;
  developerId: string;
};

export const sendRequestAction = async (data: Request) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      return { success: false, message: "Profile not found" };
    }

    // Validate job existence
    const job = await prisma.job.findUnique({
      where: { id: data.jobId },
    });
    if (!job) {
      return { success: false, message: "Job not found" };
    }

    // Prevent duplicate requests for the same job
    const existingRequest = await prisma.clientRequest.findFirst({
      where: {
        clientId: client.id,
        developerId: data.developerId,
        jobId: data.jobId,
      },
    });

    if (existingRequest) {
      return { success: false, message: "Request already sent" };
    }

    // Create the request
    await prisma.clientRequest.create({
      data: {
        message: data.message || null,
        jobId: data.jobId,
        clientId: client.id,
        developerId: data.developerId,
      },
    });

    return {
      success: true,
      message: "Request sent to developer",
    };
  } catch (error) {
    console.error("Error in sendRequestAction:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// ------------accept proposal------------------------
export const acceptProposalAction = async (proposalId: string) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      return { success: false, message: "Client profile not found" };
    }

    // Get proposal with job details
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        job: true,
        freelancerProfile: true,
      },
    });

    if (!proposal) {
      return { success: false, message: "Proposal not found" };
    }

    // Verify the job belongs to this client
    if (proposal.job.clientId !== client.id) {
      return { success: false, message: "Job not found or unauthorized" };
    }

    if (proposal.status !== "PENDING") {
      return { success: false, message: "Proposal has already been processed" };
    }

    // Check if job already has a hired freelancer
    if (proposal.job.hiredFreelancerId) {
      return { success: false, message: "Job already has a hired freelancer" };
    }

    await prisma.$transaction(async (tx) => {
      // Update proposal status to ACCEPTED
      await tx.proposal.update({
        where: { id: proposalId },
        data: { status: "ACCEPTED" },
      });

      // Update job with hired freelancer and status
      await tx.job.update({
        where: { id: proposal.jobId },
        data: {
          hiredFreelancerId: proposal.freelancerProfileId,
          status: "ONGOING",
        },
      });

      // Update client profile stats
      await tx.clientProfile.update({
        where: { id: client.id },
        data: {
          jobsHired: { increment: 1 },
          totalSpent: { increment: proposal.job.budget },
        },
      });

      // Update freelancer profile stats
      await tx.freelancerProfile.update({
        where: { id: proposal.freelancerProfileId },
        data: {
          totalJobsHired: { increment: 1 },
        },
      });

      // Reject all other pending proposals for this job
      await tx.proposal.updateMany({
        where: {
          jobId: proposal.jobId,
          status: "PENDING",
          id: { not: proposalId },
        },
        data: { status: "REJECTED" },
      });
    });

    // Invalidate related caches
    revalidateTag("job:" + proposal.jobId + ":proposals");
    revalidateTag("job:" + proposal.jobId + ":hired");
    revalidateTag("job:" + proposal.jobId);
    revalidateTag("client:" + client.id + ":jobs");

    return {
      success: true,
      message: "Proposal accepted successfully",
    };
  } catch (error) {
    console.error("Error in acceptProposalAction:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// ------------reject proposal------------------------
export const rejectProposalAction = async (proposalId: string) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      return { success: false, message: "Client profile not found" };
    }

    // Get proposal with job details
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        job: true,
      },
    });

    if (!proposal) {
      return { success: false, message: "Proposal not found" };
    }

    // Verify the job belongs to this client
    if (proposal.job.clientId !== client.id) {
      return { success: false, message: "Job not found or unauthorized" };
    }

    if (proposal.status !== "PENDING") {
      return { success: false, message: "Proposal has already been processed" };
    }

    // Update proposal status to REJECTED
    await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: "REJECTED" },
    });

    // Invalidate proposals cache for job
    revalidateTag("job:" + proposal.jobId + ":proposals");

    return {
      success: true,
      message: "Proposal rejected successfully",
    };
  } catch (error) {
    console.error("Error in rejectProposalAction:", error);
    return { success: false, message: "Something went wrong" };
  }
};
