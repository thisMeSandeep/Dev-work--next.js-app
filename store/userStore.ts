import { User } from "@/types/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";



interface UserState {
  user: User | null 
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
