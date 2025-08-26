import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Role } from "./generated/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) return null;

        return user;
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },

  callbacks: {
    // Handle OAuth user sign-ins
    async signIn({ user, account }) {
      // Only handle OAuth users (skip credentials)
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Ensure role is selected
          const cookieStore = await cookies();
          const rawRole = cookieStore.get("temp_role")?.value;

          if (!rawRole) {
            // No role = reject sign in
            throw new Error("Role not selected. Please choose a role first.");
          }

          const role = rawRole.toUpperCase() as Role;

          await prisma.user.create({
            data: {
              email: user.email!,
              firstName: user.name?.split(" ")[0] || null,
              lastName: user.name?.split(" ")[1] || null,
              role,
              profileImage: user.image || null,
              authProviderId: user.id || null,
            },
          });

          // Clear temp_role cookie after use
          cookieStore.delete("temp_role");
        }
      }

      return true;
    },

    // JWT callback - runs on every sign-in
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        // Fetch role from DB for OAuth users (credentials already have role)
        if (!user.role) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          token.role = dbUser!.role;
        } else {
          token.role = user.role;
        }
      }
      return token;
    },

    // Session callback - runs when client requests session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});
