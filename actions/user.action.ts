"use server";

import { Role } from "@/generated/prisma";
import { getUserId, getUserRole } from "@/lib/server-utils";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/uploadFile";
import { UserType } from "@/types/type";

// get user profile
export const getUserProfileAction = async () => {
  try {
    const role = (await getUserRole()) as Role;
    const userId = (await getUserId()) as string;

    let user : UserType | null;

    if (role == "DEVELOPER") {
      user = await prisma.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          authProviderId: true,
        },
        include: {
          FreelancerProfile: true,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          authProviderId: true,
        },
        include: {
          ClientProfile: true,
        },
      });
    }

    if (!user) {
      return { success: false, message: "User profile not found" };
    }

    return { success: true, user };
  } catch (err) {
    console.error("Error fetching User profile:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Internal server error",
    };
  }
};

// update user profile Image
export const updateUserProfileImageAction = async (file: File) => {
  if (!file) {
    return {
      success: false,
      message: "Please Provide Profile Image",
    };
  }

  const userId = (await getUserId()) as string;

  try {
    const fileUrl = await uploadFile(file, "avatars");

    if (!fileUrl) {
      return {
        success: false,
        message: "Error saving image , please try again",
      };
    }

    // update file link in user model
    await prisma.user.update({
      where: { id: userId },
      data: {
        profileImage: fileUrl,
      },
    });

    return {
      success: true,
      message: "Profile Image Updated",
    };
  } catch (err: unknown) {
    console.error("Error in image upload:", err);

    if (err instanceof Error) {
      return {
        success: false,
        message: err.message || "Internal server error",
      };
    }
    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
