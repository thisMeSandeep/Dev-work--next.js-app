import { z } from "zod";
import { EstimatedDuration } from "@prisma/client";

export const proposalSchema = z.object({
  coverLetter: z
    .string()
    .min(100, "Cover letter must be at least 100 characters")
    .nonempty("Cover letter is required"),

  message: z.string().optional(),

  rate: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined; // required check kicks in
    }
    return Number(val);
  }, z.number().positive("Rate must be greater than 0")),

  duration: z.enum(Object.values(EstimatedDuration) as [string, ...string[]]),

  attachedFile: z
    .preprocess((val) => {
      if (
        val &&
        typeof val === "object" &&
        "length" in val &&
        (val as FileList).length > 0
      ) {
        return val;
      }
      return null;
    }, z.any())
    .refine(
      (files) => !files || (files as FileList)[0]?.type === "application/pdf",
      {
        message: "Only PDF files are allowed",
      }
    )
    .optional(),
});

export type ProposalSchemaType = z.infer<typeof proposalSchema>;
