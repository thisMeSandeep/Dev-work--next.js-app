import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// function to upload file
export async function uploadFile(
  file: File | null | undefined,
  folderName: "avatars" | "attachments" | "resumes"
) {
  try {
    if (!file) {
      return null;
    }

    // Generate unique file path → folderName/uuid-filename.ext
    const uniqueName = `${crypto.randomUUID()}-${file.name}`;
    const filePath = `${folderName}/${uniqueName}`;

    // Upload file
    const { error } = await supabase.storage
      .from("DevWork") //bucket name
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data } = supabase.storage.from("files").getPublicUrl(filePath);

    return {
      filePath,
      publicUrl: data.publicUrl,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}
