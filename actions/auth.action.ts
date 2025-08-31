"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Role } from "@/generated/prisma";

// set temorary role cookie
export const setTempRoleAction = async (role: string) => {
  const cookieStore = await cookies();
  cookieStore.set("temp_role", role.toUpperCase(), {
    path: "/",
    maxAge: 60 * 60, // 1 hour in seconds
    httpOnly: false, // Allow client-side read if needed
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true, role };
};

// sign in with provider
export async function signInWithProvider(provider: "google" | "github") {
  await signIn(provider);
}

// register user

// Zod schema
const registerUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(1, "Country is required"),
});

export type UserRegistrationType = z.infer<typeof registerUserSchema>;

export const registerUserAction = async (data: UserRegistrationType) => {
  try {
    // Validate input
    const parsed = registerUserSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0].message,
      };
    }

    const { firstName, lastName, email, password, country } = parsed.data;

    // get role from cookies
    const cookieStore = await cookies();
    const role = cookieStore.get("temp_role")?.value as Role;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists, please login",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const newUser=await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        country,
        role,
      },
    });

    // create a profile alongside with registration
    if (role === "DEVELOPER") {
      await prisma.freelancerProfile.create({
        data: { userId: newUser.id },
      });
    } else if (role === "CLIENT") {
      await prisma.clientProfile.create({
        data: { userId: newUser.id },
      });
    }

    // clear cookie after successful registration
    cookieStore.delete("temp_role");

    // Automatically sign in user via credentials
    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signInResult?.error) {
      return {
        success: false,
        message: signInResult.error,
      };
    }

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (err: unknown) {
    console.error(err);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

// login user
export type LoginInputType = {
  email: string;
  password: string;
};

export const loginAction = async (data: LoginInputType) => {
  const { email, password } = data;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      let message = "Something went wrong. Please try again.";

      switch (result.error) {
        case "CredentialsSignin":
          message = "Invalid email or password";
          break;
        case "Configuration":
          message = "Authentication misconfigured. Please contact support.";
          break;
        case "AccessDenied":
          message = "Access denied.";
          break;
      }

      return {
        success: false,
        message,
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};
