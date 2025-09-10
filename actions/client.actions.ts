"use server";

import { prisma } from "@/lib/prisma";
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
} from "@/generated/prisma";
import {
  FreelancerProfileCoreDTO,
  JobCoreDTO,
  ProposalCoreDTO,
  UserCoreDTO,
} from "@/types/CoreDTO";

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

    await prisma.job.create({
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

    return {
      success: true,
      message: "Job created successfully",
    };
  } catch (err) {
    console.error("Error creating job:", err);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};

// -------------get all jobs posted by clients----------------
type GetAllPostedJobsSuccess = {
  success: true;
  jobs: (JobCoreDTO & { proposals: ProposalCoreDTO[] })[];
};

type GetAllPostedJobsFailure = {
  success: false;
  message: string;
};

export const getAllPostedJobsAction = async (): Promise<
  GetAllPostedJobsSuccess | GetAllPostedJobsFailure
> => {
  // fetch user id
  const userId = await getUserId();
  if (!userId) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    // get client id
    const client = await prisma.clientProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!client) {
      return { success: false, message: "Client profile not found" };
    }

    // fetch jobs
    const jobs: (JobCoreDTO & { proposals: ProposalCoreDTO[] })[] =
      await prisma.job.findMany({
        where: { clientId: client.id },
        include: { proposals: true },
      });

    return { success: true, jobs };
  } catch (err) {
    return { success: false, message: "Something went wrong" };
  }
};

// --------------get all the proposals for a job------------

export const getJobProposalsAction = async (jobId: string) => {
  try {
    const proposals: (ProposalCoreDTO & {
      freelancerProfile: FreelancerProfileCoreDTO & { user: UserCoreDTO };
    })[] = await prisma.proposal.findMany({
      where: { jobId },
      include: {
        freelancerProfile: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                country: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
    return { success: true, proposals };
  } catch (err) {
    console.error("Error fetching proposals:", err);
    return { success: false, message: "Something went wrong" };
  }
};
