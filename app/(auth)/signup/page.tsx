"use client";

import { useState } from "react";
import RoleSelectionPage from "../components/RoleSelectionPage";
import SocialLogin from "../components/SocialLogin";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff, Search, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { registerUserAction } from "@/actions/auth.action";
import type { UserRegistrationType } from "@/actions/auth.action";
import AuthRedirectHandler from "../components/AuthRedirectHandler";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import LoadingButton from "@/components/loader/LoadingButton";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
  country: z
    .string()
    .min(1, "Country is required")
    .nonempty("Country is required"),
});

type UserType = z.infer<typeof userSchema>;

const inputFieldStyling = "w-full rounded-sm border border-gray-300 px-3 py-2 text-sm focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none transition-colors";

const Signup = () => {
  const [isRoleSelected, setIsRoleSelected] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [countriesToShow, setCountriesToShow] = useState([...countries]);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  // role selection
  if (!isRoleSelected) {
    return <RoleSelectionPage setIsRoleSelected={setIsRoleSelected} />;
  }

  const selectedCountry = watch("country");

  // country search
  const handleSearch = (value: string) => {
    setCountriesToShow(
      countries.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const onSubmit = async (data: UserType) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerUserAction(data as UserRegistrationType);

      if (response.success) {
        // Auto-login after successful registration
        if (response.autoLogin) {
          const signInResult = await signIn("credentials", {
            redirect: false,
            email: response.autoLogin.email,
            password: response.autoLogin.password,
          });

          if (signInResult?.error) {
            console.error("Auto-login failed:", signInResult.error);
            setError(
              "Registration successful but auto-login failed. Please sign in manually."
            );
            return;
          }
        }

        // Successful registration and auto-login , redirect will be handled by middleware
        window.location.href = "/"; // Force page reload to trigger middleware
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log("error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthRedirectHandler />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-md border border-black/10 p-4 sm:p-8 flex flex-col gap-6"
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
            Create your <span className="text-green-600">Dev Work</span> account
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
            {/* first name */}
            <div>
              <Label
                htmlFor="firstName"
                className="text-gray-700 font-medium mb-2"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                className={inputFieldStyling}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* last name */}
            <div>
              <Label
                htmlFor="lastName"
                className="text-gray-700 font-medium mb-2"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                className={inputFieldStyling}
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

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
                  {passwordVisible ? (
                    <EyeOff size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* country */}
            <div>
              <Label className="text-gray-700 font-medium mb-2">Country</Label>
              <Select
                onValueChange={(value) => setValue("country", value)}
                value={selectedCountry}
              >
                <SelectTrigger className={inputFieldStyling}>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>

                <SelectContent className="max-h-[300px] overflow-auto">
                  {/* search */}
                  <div className="sticky top-0 bg-white z-10 p-2 border-b">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        className={inputFieldStyling}
                      />
                      <Search
                        className="absolute right-3 top-3 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  {countriesToShow.map((country) => (
                    <SelectItem value={country.name} key={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* agreement */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={checked}
                onCheckedChange={(val) => setChecked(!!val)}
                className="mt-1 size-5 border-2  data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <p className="text-sm text-gray-600 leading-snug">
                I agree to the{" "}
                <span className="text-green-700 underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-700 underline cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* submit */}
            <LoadingButton isLoading={isLoading} type="submit">
              {isLoading ? "Logging you in..." : "Sign up"}
            </LoadingButton>
          </form>

          {/* Already have account */}
          <p className="text-sm text-gray-700 text-center">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
