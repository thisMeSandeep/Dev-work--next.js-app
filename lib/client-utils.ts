"use client";

import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

export function useUserRole(): Role | null {
  const { data: session } = useSession();
  return session?.user?.role ?? null;
}

export function useUserId(): string | null {
  const { data: session } = useSession();
  return session?.user?.userId ?? null;
}
