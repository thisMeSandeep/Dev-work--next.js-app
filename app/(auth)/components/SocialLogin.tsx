"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SocialLogin() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(provider);

    try {
      await signIn(provider);
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setIsLoading(null);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4">
      {/* GitHub */}
      <Button
        onClick={() => handleSocialLogin("github")}
        disabled={isLoading !== null}
        className="flex-1 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 shadow-md transform transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        <span className="p-1 bg-white rounded-full">
          <IconBrandGithub className="w-5 h-5 text-gray-900" />
        </span>
        {isLoading === "github" ? "Connecting..." : "Continue with GitHub"}
      </Button>

      {/* Google */}
      <Button
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading !== null}
        variant="outline"
        className="flex-1 flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 shadow-sm transform transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        <span className="p-1 bg-red-500 rounded-full">
          <IconBrandGoogleFilled className="w-5 h-5 text-white" />
        </span>
        {isLoading === "google" ? "Connecting..." : "Continue with Google"}
      </Button>
    </div>
  );
}
