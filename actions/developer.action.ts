"use server";

import {
  developerProfileSchema,
  DeveloperProfileType,
} from "@/lib/schemas/developerProfile.schema";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/server-utils";
import { uploadFile } from "@/lib/uploadFile";

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
