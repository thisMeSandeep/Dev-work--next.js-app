import { getUserProfileAction } from "@/actions/user.action";
import { useUserStore } from "@/store/userStore";

export const fetchAndSetUser = async () => {
  try {
    const response = await getUserProfileAction();
    if (response.success) {
      useUserStore.getState().setUser(response.user);
    } else {
      console.log("error in getting user:", response.message);
    }
  } catch (err) {
    console.log("error:", err);
  }
};
