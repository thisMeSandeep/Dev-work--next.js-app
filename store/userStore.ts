import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  [key: string]: unknown; 
}

interface UserState {
  user: User | null | undefined;
  setUser: (user: User | undefined) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: "UserStore" }
  )
);
