"use client";

import { useState } from "react";
import SocialLogin from "../components/SocialLogin";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { loginAction } from "@/actions/auth.action";
import AuthRedirectHandler from "../components/AuthRedirectHandler";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});

type UserType = z.infer<typeof userSchema>;

const inputFieldStyling = `w-full rounded-2xl border border-black/20 px-3 py-2 text-sm text-gray-800
placeholder:text-gray-400 
focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 
focus-visible:outline-none transition-colors`;

const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UserType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Form data:", data);
      const result = await loginAction(data);
      
      if (!result.success) {
        setError(result.message);
      } else {
        // Successful login - redirect will be handled by middleware
        window.location.href = "/"; // Force page reload to trigger middleware
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthRedirectHandler />
      <div className="min-h-screen flex items-center justify-center px-6 py-12 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-md border border-black/10  p-4 sm:p-8  flex flex-col gap-6"
        >
          {/* Back to home link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* heading */}
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Sign in your <span className="text-green-600">Dev Work</span> account
          </h1>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* OAuth */}
          <SocialLogin />

          <p className="text-center text-gray-400">or continue with</p>

          {/* form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={inputFieldStyling}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 font-medium mb-2"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputFieldStyling} pr-12`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* submit */}
            <motion.div whileHover={{ scale: isLoading ? 1 : 1.03 }} className="mx-auto">
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 rounded-2xl border border-green-500 
                 bg-green-600  text-lg font-medium 
                 hover:bg-green-500 text-white 
                 transition-all duration-300 
                 disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </motion.div>
          </form>

          {/* don't have account */}
          <p className="text-sm text-gray-700 text-center">
            Do not have an account?{" "}
            <Link
              href="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Signin;
