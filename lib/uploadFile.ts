import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const FILE_SIZE_LIMITS = {
  avatars: 5 * 1024 * 1024, 
  attachments: 10 * 1024 * 1024,
  resumes: 5 * 1024 * 1024, 
} as const;

// Allowed file types
const ALLOWED_TYPES: Record<string, string[]> = {
  avatars: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  attachments: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  resumes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
};

// function to upload file
export async function uploadFile(
  file: File | null | undefined,
  folderName: "avatars" | "attachments" | "resumes"
) {
  try {
    if (!file) {
      return null;
    }

    // Validate file size
    const maxSize = FILE_SIZE_LIMITS[folderName];
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
    }

    // Validate file type
    const allowedTypes = ALLOWED_TYPES[folderName];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        `File type ${file.type} is not allowed for ${folderName}`
      );
    }

    // Sanitize filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    // Generate unique file path → folderName/uuid-filename.ext
    const uniqueName = `${crypto.randomUUID()}-${sanitizedName}`;
    const filePath = `${folderName}/${uniqueName}`;

    const { error } = await supabase.storage
      .from("DevWork") //bucket name
      .upload(filePath, file, {
        cacheControl: "3600",
      });

    if (error) throw error;

    // Get public URL
    const { data } = supabase.storage.from("DevWork").getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}
