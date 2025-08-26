"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { signInWithProvider } from "@/actions/auth.action";

export default function SocialLogin() {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
      {/* GitHub */}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          signInWithProvider("github");
        }}
      >
        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 shadow-md transform transition-all duration-300 hover:scale-105"
        >
          <span className="p-1 bg-white rounded-full">
            <IconBrandGithub className="w-5 h-5 text-gray-900" />
          </span>
          Continue with GitHub
        </Button>
      </form>

      {/* Google */}
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          signInWithProvider("google");
        }}
      >
        <Button
          type="submit"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white hover:bg-gray-100 shadow-sm transform transition-all duration-300 hover:scale-105"
        >
          <span className="p-1 bg-red-500 rounded-full">
            <IconBrandGoogleFilled className="w-5 h-5 text-white" />
          </span>
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
