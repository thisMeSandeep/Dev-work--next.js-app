// types/next-auth.d.ts
import  { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Custom User type returned by your OAuth providers or Credentials authorize
   */
  interface User extends DefaultUser {
    id: string; // Prisma User ID
    role: "DEVELOPER" | "CLIENT"; // User role
  }

  /**
   * Custom Session type returned by `useSession` or `getServerSession`
   */
  interface Session {
    user: {
      id: string;
      role: "DEVELOPER" | "CLIENT";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT object used in `jwt` callback and session token
   */
  interface JWT extends DefaultJWT {
    id: string;
    role: "DEVELOPER" | "CLIENT";
  }
}
