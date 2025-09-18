import { useState } from "react";
import { aiJobDataSchema } from "@/lib/schemas/JobData.schema";
import { ZodError } from "zod";

interface JobDataResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
    generate: (prompt: string) => Promise<void>;
}

export function useGenerateJobData<T = any>(): JobDataResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function generate(prompt: string) {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch("/api/completion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error || "Failed to generate job data. Please try again.");
                return;
            }

            try {
                // Validate the response with Zod schema
                const validated = aiJobDataSchema.parse(json);
                setData(validated as T);
            } catch (err) {
                if (err instanceof ZodError) {
                    setError("The generated data format is invalid. Please try again with a different prompt.");
                    return;
                }
                throw err;
            }
        } catch (err) {
            setError("Unable to generate job data. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    return { data, error, loading, generate };
}