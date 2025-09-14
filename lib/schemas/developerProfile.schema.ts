import { z } from "zod";
import { Category, ExperienceLevel, Speciality } from "@prisma/client";

// Zod schema
const optionalUrl = z.preprocess(
  (val) => (val === "" ? null : val),
  z.url("Must be a valid URL").nullable().optional()
);

export const developerProfileSchema = z.object({
  available: z.boolean(),
  country: z.string().nonempty("Country is required"),
  mobile: z
    .union([
      z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
      z.literal(""),
      z.null(),
    ])
    .optional(),
  bio: z.preprocess(
    (val) => (val === "" ? null : val),
    z
      .string()
      .min(100, "Bio must be at least 100 characters")
      .nullable()
      .optional()
  ),
  skills: z.array(z.string().min(1, "Skill cannot be empty")),
  category: z.enum(Object.values(Category)).optional(),
  speciality: z.enum(Object.values(Speciality)).optional(),
  experienceLevel: z.enum(Object.values(ExperienceLevel)).optional(),
  perHourRate: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    },
    z.number().positive("Rate must be positive").nullable().optional()
  ),
  languages: z.string().optional().nullable(),
  portfolioLink: optionalUrl,
  otherLink: optionalUrl,
  file: z.instanceof(File).optional().nullable(),
});

export type DeveloperProfileType = z.infer<typeof developerProfileSchema>;
