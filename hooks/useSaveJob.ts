import { saveJobAction } from "@/actions/developer.action";
import { fetchAndSetUser } from "@/lib/fetchUser";
import { useState } from "react";

export function useSaveJob() {
  const [loading, setLoading] = useState(false);

  const saveJob = async (jobId: string) => {
    try {
      setLoading(true);

      const res = await saveJobAction(jobId);
      await fetchAndSetUser();
      return res;
    } catch (err) {
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, loading };
}
