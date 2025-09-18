import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request): Promise<Response> {
  try {
    const { text, tone, maxLength } = (await req.json()) as {
      text?: string;
      tone?: string;
      maxLength?: number;
    };

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide some text to enhance." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const toneHint = tone ? `Target tone: ${tone}.` : "";
    const lengthHint = maxLength ? `Keep it under ${maxLength} characters.` : "";

    const { text: enhanced } = await generateText({
      model: google("gemini-2.5-flash"),
      system:
        "You enhance user-provided text to be clearer, concise, professional, and error-free. Preserve the original meaning. Avoid adding facts. Return only the improved text without markdown or commentary.",
      prompt: `Improve the following text. ${toneHint} ${lengthHint}\n\nText:\n"""${text}\n"""`,
    });

    return new Response(
      JSON.stringify({ enhancedText: enhanced }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("AI text enhancement failed:", error);
    let message = "An unexpected error occurred while enhancing text.";
    if (error instanceof Error) message = error.message;
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


