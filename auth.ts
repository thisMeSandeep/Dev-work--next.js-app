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

        //Credentials login → just return user
        return user;
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          const cookieStore = await cookies();
          const rawRole = cookieStore.get("temp_role")?.value;

          if (!rawRole) {
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

          cookieStore.delete("temp_role");
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as Role;
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
});
