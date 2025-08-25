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
          className="w-full flex items-center justify-center gap-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition cursor-pointer"
        >
          <IconBrandGithub className="w-5 h-5" />
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
          className="w-full flex items-center justify-center gap-3 rounded-full border-gray-300 hover:bg-gray-100 transition cursor-pointer"
        >
          <IconBrandGoogleFilled className="w-5 h-5 text-red-500" />
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
