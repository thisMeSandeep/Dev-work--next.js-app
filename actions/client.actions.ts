"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/server-utils";

const clientDataSchema = z.object({
  country: z.string().min(1, "Country is required"),
  mobile: z.string().min(8, "Mobile number is too short"),
  company: z.string().min(2, "Company name is required"),
  websiteLink: z
    .union([z.url("Invalid URL"), z.literal("")]) 
    .optional(),
});

type ClientDataType = z.infer<typeof clientDataSchema>;

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

    // Save or update client profile
    await prisma.clientProfile.upsert({
      where: { userId },
      update: {
        mobile,
        company,
        websiteLink: websiteLink === "" ? null : websiteLink,
      },
      create: {
        userId,
        mobile,
        company,
        rating,
        websiteLink: websiteLink === "" ? null : websiteLink,
      },
    });

    return { success: true, message: "Client profile saved" };
  } catch (err: any) {
    console.error(err);
    return { success: false, message: "Something went wrong" };
  }
};
