import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout as apiLogout } from "../services/apiServices";
import { User } from "../types/loginTypes";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ isAuthenticated: true, user }),
      logout: async () => {
        try {
          const resp = await apiLogout();
          if (resp?.statusCode === 200) {
            window.location.href = "/admin/sign-in";
            set({ isAuthenticated: false, user: null });
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;
