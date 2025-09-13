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

        try {
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            console.log("User not found:", email);
            return null; 
          }

          if (!user.password) {
            console.log("User has no password:", email);
            return null;
          }

          const matched = await bcrypt.compare(password, user.password);
          if (!matched) {
            console.log("Invalid password for user:", email);
            return null; 
          }

          // Return consistent user object structure
          return {
            id: user.id,
            email: user.email,
            name: user.firstName + (user.lastName ? ` ${user.lastName}` : ""),
            role: user.role,
            image: user.profileImage,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      try {
        // Handle credentials provider - validation already done in authorize
        if (account?.provider === "credentials") {
          return true;
        }

        // Handle OAuth providers (Google, GitHub)
        if (account?.provider !== "credentials") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // New user registration via OAuth
            const cookieStore = await cookies();
            const rawRole = cookieStore.get("temp_role")?.value;

            if (!rawRole) {
              console.error("Role not selected for OAuth registration");
              return false; // Return false instead of throwing error
            }

            const role = rawRole.toUpperCase() as Role;

            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                firstName: user.name?.split(" ")[0] || null,
                lastName: user.name?.split(" ")[1] || null,
                role,
                profileImage: user.image || null,
                authProviderId: user.id || null,
              },
            });

            // Create profile based on role
            if (role === "DEVELOPER") {
              await prisma.freelancerProfile.create({
                data: { userId: newUser.id },
              });
            } else if (role === "CLIENT") {
              await prisma.clientProfile.create({
                data: { userId: newUser.id },
              });
            }

            // Update user object with DB data
            user.id = newUser.id;
            user.role = newUser.role;

            // Clear role cookie after successful registration
            cookieStore.delete("temp_role");
          } else {
            // Existing user login via OAuth
            user.id = existingUser.id;
            user.role = existingUser.role;
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
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
