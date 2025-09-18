import { z } from "zod";
import {
  ExperienceLevel,
  Category,
  Speciality,
  ScopeSize,
  ScopeDuration,
} from "@prisma/client";

// Convert Prisma enums to Zod enums dynamically
const experienceLevelEnum = z.enum(
  Object.values(ExperienceLevel) as [string, ...string[]]
);
const categoryEnum = z.enum(Object.values(Category) as [string, ...string[]]);
const specialityEnum = z.enum(
  Object.values(Speciality) as [string, ...string[]]
);
const scopeSizeEnum = z.enum(Object.values(ScopeSize) as [string, ...string[]]);
const scopeDurationEnum = z.enum(
  Object.values(ScopeDuration) as [string, ...string[]]
);

export const aiJobDataSchema = z.object({
  title: z.string(),
  description: z.string().min(100),
  category: categoryEnum,
  speciality: specialityEnum,
  skills: z.array(z.string()),
  budget: z.number().positive(),
  scopeSize: scopeSizeEnum,
  duration: scopeDurationEnum,
  experienceRequired: experienceLevelEnum,
  connectsRequired: z.number().min(5).max(40),
});
