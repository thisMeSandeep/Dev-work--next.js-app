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
import { EstimatedDuration } from "@prisma/client";
import { ProposalDTO } from "@/types/propoalDTO";

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

    return { success: true, message: "Job unsaved" };
  } catch (error) {
    console.error("Error unsaving job:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// ---------- send a proposal action--------------
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
        message: "You already have an active proposal for this job.",
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
        duration: (duration as EstimatedDuration),
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

    return { success: true, message: "Proposal created successfully" };
  } catch (error: any) {
    console.error("Error creating proposal:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

//update a proposal action
export async function updateProposalAction(
  proposalId: string,
  data: ProposalSchemaType
) {
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

    // Optional: check if the user owns this proposal (security)
    const userId = await getUserId();

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

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

    // Update the proposal
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        coverLetter,
        message: message ?? null,
        rate: rate ?? null,
        duration: (duration as EstimatedDuration) ?? null,
        attachedFile: fileUrl ?? null,
      },
    });

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

    //  Fetch proposals
    const proposals: ProposalDTO[] = await prisma.proposal.findMany({
      where: { freelancerProfileId: freelancer.id },
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

    return { success: true, message: "Proposal withdrawn successfully" };
  } catch (error: any) {
    console.error("Error withdrawing proposal:", error);
    return {
      success: false,
      message: "Something went wrong, please try again.",
    };
  }
}
