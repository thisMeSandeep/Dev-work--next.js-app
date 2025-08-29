import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: Record<string, unknown> | null;
  setUser: (user: Record<string, unknown>) => void;
  clearUser: () => void;
}


export const useUserStore = create<UserState>()(
  devtools<UserState>(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearUser: () => set({ user: null }),
    }),
    { name: "UserStore" }
  )
);
