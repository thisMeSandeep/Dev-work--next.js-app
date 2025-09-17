import { z } from "zod";
import { EstimatedDuration } from "@prisma/client";

export const proposalSchema = z.object({
  coverLetter: z
    .string({ message: "Cover letter is required" })
    .min(100, "Cover letter must be at least 100 characters"),

  message: z.string().optional(),

  rate: z.preprocess((val) => {
    if (val === "" || val === undefined || val === null) {
      return undefined;
    }
    return Number(val);
  }, z.number({ message: "Rate must be a valid number" }).positive("Rate must be greater than 0")),

  duration: z.enum(Object.values(EstimatedDuration) as [string, ...string[]], {
    message: "Please select a valid project duration",
  }),

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
      "Only PDF files are allowed"
    )
    .optional(),
});

export type ProposalSchemaType = z.infer<typeof proposalSchema>;
