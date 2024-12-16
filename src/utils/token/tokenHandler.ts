import { jwtDecode } from "jwt-decode";
import useAuthStore from "../../store/authStore";

export const isTokenExpired = (token: string | null): boolean => {
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      const { logout } = useAuthStore.getState();
      logout(); // Clear authentication state
      window.location.href = "/admin/sign-in";
      return true;
    }
  }
  return false;
};
