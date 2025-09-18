"use server";

import {
  developerProfileSchema,
  DeveloperProfileType,
} from "@/lib/schemas/developerProfile.schema";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/server-utils";
import { uploadFile } from "@/lib/uploadFile";
import { proposalSchema } from "@/lib/schemas/proposal.schema";
import { ProposalSchemaType } from "@/lib/schemas/proposal.schema";
import { ClientRequestStatus, EstimatedDuration } from "@prisma/client";
import { ProposalDTO } from "@/types/propoalDTO";
import { JobCoreDTO } from "@/types/CoreDTO";
import { RequestWithClient } from "@/types/type";
import { revalidateTag, unstable_cache } from "next/cache";

// -----------------action to update developer profile---------------
export const updateDeveloperProfileAction = async (
  data: DeveloperProfileType
) => {
  try {
    // validate data
    const result = developerProfileSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    const userId = (await getUserId()) as string;

    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // extract developer data
    const developer = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (!developer) {
      return { success: false, message: "Developer profile not found" };
    }

    const {
      available,
      country,
      mobile,
      bio,
      skills,
      category,
      speciality,
      experienceLevel,
      perHourRate,
      languages,
      portfolioLink,
      otherLink,
      file,
    } = result.data;

    // save country in user model
    await prisma.user.update({
      where: { id: userId },
      data: { country },
    });

    // upload file if it exists to supabase
    let fileUrl: string | null = null;
    if (file) {
      fileUrl = await uploadFile(file, "resumes");
      if (!fileUrl) {
        return {
          success: false,
          message: "Error uploading file, please try again",
        };
      }
    }

    // save other data in developer profile
    await prisma.freelancerProfile.update({
      where: { id: developer.id },
      data: {
        available,
        mobile,
        bio,
        skills,
        category,
        speciality,
        experienceLevel,
        perHourRate,
        languages,
        portfolioLink,
        otherLink,
        ...(fileUrl && { file: fileUrl }), // only update file if new file was uploaded
      },
    });

    // Invalidate developer profile caches
    revalidateTag("dev:" + developer.id + ":profile");

    return { success: true, message: "Developer profile updated" };
  } catch (err) {
    console.error("Error updating developer profile:", err);
    return { success: false, message: "Something went wrong" };
  }
};

// -----------------save a job-------------------------
export const saveJobAction = async (jobId: string) => {
  try {
    const userId = (await getUserId()) as string;
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      return { success: false, message: "Freelancer profile not found" };
    }

    const alreadySaved = await prisma.freelancerProfile.findFirst({
      where: {
        id: profile.id,
        savedJobs: {
          some: { id: jobId },
        },
      },
    });

    if (alreadySaved) {
      return { success: false, message: "Job already saved" };
    }

    await prisma.freelancerProfile.update({
      where: { id: profile.id },
      data: {
        savedJobs: {
          connect: { id: jobId },
        },
      },
    });

    // Invalidate saved jobs cache for developer
    revalidateTag("dev:" + profile.id + ":saved-jobs");

    return { success: true, message: "Job saved" };
  } catch (error) {
    console.error("Error saving job:", error);
    return { success: false, message: "Something went wrong" };
  }
};

//--------------- unsave a job------------------
export const unsaveJobAction = async (jobId: string) => {
  try {
    const userId = (await getUserId()) as string;
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      return { success: false, message: "Freelancer profile not found" };
    }

    const alreadySaved = await prisma.freelancerProfile.findFirst({
      where: {
        id: profile.id,
        savedJobs: {
          some: { id: jobId },
        },
      },
    });

    if (!alreadySaved) {
      return { success: false, message: "Job not found in saved list" };
    }

    await prisma.freelancerProfile.update({
      where: { id: profile.id },
      data: {
        savedJobs: {
          disconnect: { id: jobId },
        },
      },
    });

    // Invalidate saved jobs cache for developer
    revalidateTag("dev:" + profile.id + ":saved-jobs");

    return { success: true, message: "Job unsaved" };
  } catch (error) {
    console.error("Error unsaving job:", error);
    return { success: false, message: "Something went wrong" };
  }
};

//------------------get saved jobs----------------------
export const getSavedJobsAction = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // get developer id for tagging
    const dev = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    //get saved jobs (cached)
    const getSavedJobsCached = unstable_cache(
      async (uid: string) => {
        const savedJobs: JobCoreDTO[] = await prisma.job.findMany({
          where: {
            savedBy: {
              some: { userId: uid },
            },
          },
        });
        return savedJobs;
      },
      ["dev-saved-jobs", String(userId)],
      { tags: dev ? ["dev:" + dev.id + ":saved-jobs"] : undefined }
    );

    const savedJobs = await getSavedJobsCached(userId);

    return { success: true, data: savedJobs };
  } catch (error) {
    console.error("Error getting saved jobs:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// -----------------------send a proposal action------------------
export async function createProposalAction(
  jobId: string,
  data: ProposalSchemaType
) {
  try {
    if (!jobId) {
      return { success: false, message: "Job not found" };
    }

    // Validate data
    const result = await proposalSchema.safeParseAsync(data);
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    const { coverLetter, message, rate, duration, attachedFile } = result.data;

    //Get the logged-in user id
    const userId = await getUserId();
    if (!userId) throw new Error("User not authenticated");

    // Fetch freelancerProfileId for that user
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!freelancer) {
      return { success: false, message: "Freelancer profile not found" };
    }

    // Check if proposal already exists
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        freelancerProfileId: freelancer.id,
        jobId,
        status: "PENDING",
      },
    });

    if (existingProposal) {
      return {
        success: false,
        message: "You have already sent a proposal for this job.",
      };
    }

    // Upload file if exists
    let fileUrl: string | null = null;
    if (attachedFile) {
      fileUrl = await uploadFile(attachedFile, "resumes");
      if (!fileUrl) {
        return {
          success: false,
          message: "Error saving attached file, please try again",
        };
      }
    }

    // 4. Create the proposal
    await prisma.proposal.create({
      data: {
        coverLetter,
        message: message ?? null,
        rate: rate,
        duration: duration as EstimatedDuration,
        attachedFile: fileUrl ?? null,
        freelancerProfile: {
          connect: { id: freelancer.id },
        },
        job: {
          connect: { id: jobId },
        },
      },
    });

    // 5. Increment numberOfProposals on Job
    await prisma.job.update({
      where: { id: jobId },
      data: { numberOfProposals: { increment: 1 } },
    });

    // Invalidate caches related to proposals for this job and developer
    revalidateTag("job:" + jobId + ":proposals");
    revalidateTag("dev:" + freelancer.id + ":proposals");

    return { success: true, message: "Proposal created successfully" };
  } catch (error: any) {
    console.error("Error creating proposal:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

//--------------------------update a proposal action------------------
export async function updateProposalAction(
  proposalId: string,
  data: ProposalSchemaType
) {
  const userId = await getUserId();

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    if (!proposalId) {
      return { success: false, message: "Proposal ID not provided" };
    }

    // Validate data
    const result = await proposalSchema.safeParseAsync(data);
    if (!result.success) {
      return { success: false, message: result.error.issues[0].message };
    }

    const { coverLetter, message, rate, duration, attachedFile } = result.data;

    // Fetch the existing proposal
    const existingProposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    });
    if (!existingProposal) {
      return { success: false, message: "Proposal not found" };
    }

    // Check if the user owns this proposal
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!freelancer || freelancer.id !== existingProposal.freelancerProfileId) {
      return {
        success: false,
        message: "Not authorized to update this proposal",
      };
    }

    // Allow update only if proposal is pending or withdrawn
    if (
      existingProposal.status !== "PENDING" &&
      existingProposal.status !== "WITHDRAWN"
    ) {
      return {
        success: false,
        message: `Proposal cannot be updated once ${existingProposal.status.toLowerCase()}`,
      };
    }

    // Upload file if new file is attached
    let fileUrl = existingProposal.attachedFile;
    if (attachedFile) {
      fileUrl = await uploadFile(attachedFile, "resumes");
      if (!fileUrl) {
        return {
          success: false,
          message: "Error saving attached file, please try again",
        };
      }
    }

    // If proposal was withdrawn and user updates it, switch back to pending
    const newStatus =
      existingProposal.status === "WITHDRAWN"
        ? "PENDING"
        : existingProposal.status;

    // Update the proposal
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        coverLetter,
        message: message ?? null,
        rate: rate ?? null,
        duration: (duration as EstimatedDuration) ?? null,
        attachedFile: fileUrl ?? null,
        status: newStatus,
      },
    });

    // Invalidate developer proposals cache
    revalidateTag("dev:" + freelancer.id + ":proposals");
    revalidateTag("job:" + existingProposal.jobId + ":proposals");

    return { success: true, message: "Proposal updated successfully" };
  } catch (error: any) {
    console.error("Error updating proposal:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// ------------fetch all proposals made by a developer--------------

type FetchProposalsResponse =
  | { success: true; proposals: ProposalDTO[] }
  | { success: false; message: string };

export async function fetchProposalsAction(): Promise<FetchProposalsResponse> {
  try {
    //Get logged-in user
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    //Get freelancer profile of user
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!freelancer) {
      return { success: false, message: "Freelancer profile not found" };
    }

    //  Fetch proposals (cached)
    const getDevProposalsCached = unstable_cache(
      async (freelancerId: string) => {
        const proposals: ProposalDTO[] = await prisma.proposal.findMany({
          where: { freelancerProfileId: freelancerId },
          include: {
            job: {
              select: {
                id: true,
                title: true,
                description: true,
                budget: true,
                status: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return proposals;
      },
      ["dev-proposals", freelancer.id],
      { tags: ["dev:" + freelancer.id + ":proposals"] }
    );

    const proposals = await getDevProposalsCached(freelancer.id);

    return {
      success: true,
      proposals,
    };
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// ----------------withdraw a proposal----------------
export async function withdrawProposalAction(proposalId: string) {
  try {
    //Get logged-in user
    const userId = await getUserId();
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    //Get freelancer profile of user
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!freelancer) {
      return { success: false, message: "Freelancer profile not found" };
    }

    // 3. Fetch proposal
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      select: { freelancerProfileId: true, status: true },
    });

    if (!proposal) {
      return { success: false, message: "Proposal not found" };
    }

    //ensure proposal belongs to this freelancer
    if (proposal.freelancerProfileId !== freelancer.id) {
      return {
        success: false,
        message: "Not authorized to withdraw this proposal",
      };
    }

    if (proposal.status !== "PENDING") {
      return {
        success: false,
        message: "Only pending proposals can be withdrawn",
      };
    }

    // 4. Update status to withdrawn
    await prisma.proposal.update({
      where: { id: proposalId },
      data: { status: "WITHDRAWN" },
    });

    // Invalidate caches
    revalidateTag("dev:" + freelancer.id + ":proposals");

    return { success: true, message: "Proposal withdrawn successfully" };
  } catch (error: any) {
    console.error("Error withdrawing proposal:", error);
    return {
      success: false,
      message: "Something went wrong, please try again.",
    };
  }
}

//-----------------------get all requests made to a dev---------------
export const getRequestsAction = async () => {
  const userId = await getUserId();

  if (!userId) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!freelancer) {
      return { success: false, message: "Profile not found" };
    }

    // Fetch requests with client + user data (cached)
    const getRequestsCached = unstable_cache(
      async (developerId: string) => {
        const requests: RequestWithClient[] = await prisma.clientRequest.findMany({
          where: { developerId, status: "PENDING" },
          include: {
            client: { include: { user: true } },
          },
          orderBy: { createdAt: "desc" },
        });
        return requests;
      },
      ["dev-requests", freelancer.id],
      { tags: ["dev:" + freelancer.id + ":requests"] }
    );

    const requests = await getRequestsCached(freelancer.id);

    return {
      success: true,
      requests,
    };
  } catch (error) {
    console.error("getRequestsAction error:", error);
    return { success: false, message: "Something went wrong" };
  }
};


//-------------------set status of a request---------------------
export const setRequestStatusAction = async (
  requestId: string,
  status: ClientRequestStatus
) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // Fetch freelancer profile of logged-in user
    const freelancer = await prisma.freelancerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!freelancer) {
      return { success: false, message: "Freelancer profile not found" };
    }

    // Fetch the request
    const request = await prisma.clientRequest.findUnique({
      where: { id: requestId },
      select: { id: true, developerId: true, status: true },
    });

    if (!request) {
      return { success: false, message: "Request not found" };
    }

    // Only assigned freelancer can update
    if (request.developerId !== freelancer.id) {
      return {
        success: false,
        message: "Not authorized to update this request",
      };
    }

    // Prevent redundant updates
    if (request.status === status) {
      return { success: false, message: `Request is already ${status}` };
    }

    // Prevent updates once request is finalized (ACCEPTED or REJECTED)
    if (["ACCEPTED", "REJECTED"].includes(request.status)) {
      return {
        success: false,
        message: "Cannot update a request that has already been finalized",
      };
    }

    await prisma.clientRequest.update({
      where: { id: requestId },
      data: { status },
    });

    // Invalidate requests cache for this developer
    revalidateTag("dev:" + freelancer.id + ":requests");

    return { success: true, message: "Request status updated successfully" };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, message: "Something went wrong" };
  }
};



