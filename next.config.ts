import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub avatars
      "lh3.googleusercontent.com", // Google profile pics
      "ncmiahtltzihmnhugckw.supabase.co", // Supabase storage
    ],
  },
};

export default nextConfig;
