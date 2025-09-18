import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { aiJobDataSchema } from "@/lib/schemas/JobData.schema";

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt } = await req.json();
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      system: `
You are an assistant that generates realistic job posting data based on user prompts.

Guidelines:
- Create professional, detailed job descriptions (minimum 100 characters)
- Infer realistic budget, timeline, and skill requirements from the context
- Choose appropriate categories and specialties that match the job type
- Never use placeholder or undefined values
- Make all details consistent with the job requirements

Generate realistic job postings that a freelancer would actually want to apply for.
      `,
      prompt,
      schema: aiJobDataSchema,
    });
    return result.toJsonResponse();
  } catch (error: unknown) {
    console.error("AI job data generation failed:", error);

    // Normalize error response
    let message = "An unexpected error occurred while generating job data.";
    if (error instanceof Error) {
      message = error.message;
    }

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
