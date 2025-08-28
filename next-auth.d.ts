import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: "DEVELOPER" | "CLIENT";
  }
  interface Session {
    user: {
      userId: string;
      role: "DEVELOPER" | "CLIENT";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    role: "DEVELOPER" | "CLIENT";
  }
}
