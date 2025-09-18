import { useCallback, useState } from "react";

interface EnhanceOptions {
  tone?: string;
  maxLength?: number;
}

interface UseEnhanceTextResponse {
  enhance: (text: string, options?: EnhanceOptions) => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export function useEnhanceText(): UseEnhanceTextResponse {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enhance = useCallback(async (text: string, options?: EnhanceOptions) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, ...options }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Failed to enhance text. Please try again.");
        return null;
      }
      return (json?.enhancedText as string) ?? null;
    } catch (e) {
      setError("Unable to enhance text. Please check your connection and try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { enhance, loading, error };
}


