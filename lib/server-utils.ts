import { auth } from "@/auth";
import { Role } from "@prisma/client";

export async function getUserRole(): Promise<Role | null> {
  const session = await auth();
  return session?.user?.role ?? null;
}

export async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.userId ?? null;
}
