import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

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
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null; 
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null; 
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          return null;
        }

        return user; 
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Only handle OAuth users
      if (account?.provider) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              firstName: user.name?.split(" ")[0] || null,
              lastName: user.name?.split(" ")[1] || null,
              role: "DEVELOPER", // default role
              profileImage: user.image || null,
              authProviderId: user.id || null, // store OAuth provider id
            },
          });
        }
      }
      return true;
    },
  },
});
