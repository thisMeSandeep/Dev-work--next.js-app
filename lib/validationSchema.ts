import * as z from "zod";
import {
  ExperienceLevel,
  Category,
  Speciality,
  ScopeSize,
  ScopeDuration,
} from "@prisma/client";

// client data
export const clientDataSchema = z.object({
  country: z.string().min(1, "Country is required"),
  mobile: z.string().min(8, "Mobile number is too short"),
  company: z.string().min(2, "Company name is required"),
  websiteLink: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
});

export type ClientDataType = z.infer<typeof clientDataSchema>;

// job schema

// Convert Prisma enums into string unions
const CategoryEnum = z.enum(Object.values(Category) as [string, ...string[]]);
const SpecialityEnum = z.enum(
  Object.values(Speciality) as [string, ...string[]]
);
const ScopeSizeEnum = z.enum(Object.values(ScopeSize) as [string, ...string[]]);
const ScopeDurationEnum = z.enum(
  Object.values(ScopeDuration) as [string, ...string[]]
);
const ExperienceLevelEnum = z.enum(
  Object.values(ExperienceLevel) as [string, ...string[]]
);

export const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(100),

  category: CategoryEnum,
  speciality: SpecialityEnum,

  skills: z.array(z.string().min(1)),

  budget: z.number().positive(),

  scopeSize: ScopeSizeEnum,
  duration: ScopeDurationEnum,
  experienceRequired: ExperienceLevelEnum,

  connectsRequired: z.number().int().min(1).max(40),

  attachment: z
    .union([z.instanceof(File), z.null()])
    .optional()
    .nullable(),
});

export type JobSchemaType = z.infer<typeof jobSchema>;
