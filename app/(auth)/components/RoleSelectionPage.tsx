"use client";

import { setTempRoleAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { User, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  setIsRoleSelected: (role:boolean) => void;
};

const RoleSelectionPage = ({  setIsRoleSelected }: Props) => {
 
  const [tempRole, setTempRole] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (tempRole) {
      await setTempRoleAction(tempRole)
      setIsRoleSelected(true); 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-8">
        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Join as a <span className="text-green-600">client</span> or{" "}
          <span className="text-green-600">freelance developer</span>
        </h3>

        {/* Role options */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full">
          {/* Client Card */}
          <div
            onClick={() => setTempRole("client")}
            className={`w-full flex-1 border rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all group ${
              tempRole === "client"
                ? "border-green-600 shadow-md"
                : "border-gray-200 hover:border-green-500 hover:shadow-md"
            }`}
          >
            <div
              className={`p-3 rounded-full transition-colors ${
                tempRole === "client"
                  ? "bg-green-100"
                  : "bg-green-50 group-hover:bg-green-100"
              }`}
            >
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-700 font-medium text-center">
              I am a <span className="font-semibold">client</span>, hiring for a
              project
            </p>
          </div>

          {/* Developer Card */}
          <div
            onClick={() => setTempRole("developer")}
            className={`w-full flex-1 border rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all group ${
              tempRole === "developer"
                ? "border-green-600 shadow-md"
                : "border-gray-200 hover:border-green-500 hover:shadow-md"
            }`}
          >
            <div
              className={`p-3 rounded-full transition-colors ${
                tempRole === "developer"
                  ? "bg-green-100"
                  : "bg-green-50 group-hover:bg-green-100"
              }`}
            >
              <User className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-700 font-medium text-center">
              I am a <span className="font-semibold">developer</span>, looking
              for work
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleConfirm}
          disabled={!tempRole}
          className="w-full md:w-auto bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 disabled:opacity-50 cursor-pointer"
        >
          {tempRole ? `Apply as ${tempRole}` : "Create account"}
        </Button>

        {/* Already have account */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
