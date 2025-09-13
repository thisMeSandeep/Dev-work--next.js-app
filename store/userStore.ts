import { UserType } from "@/types/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";



interface UserState {
  user: UserType | null 
  setUser: (user: UserType | undefined) => void;
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
