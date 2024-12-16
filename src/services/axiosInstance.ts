import axios from "axios";
import useAuthStore from "../store/authStore"; // Adjust the import path as per your project structure

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL, // Base URL from environment variables
  headers: {
    "ngrok-skip-browser-warning": "true", // Custom headers if needed
  },
  timeout: 10000, // Set request timeout
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState(); // Access Zustand store to get the user
    const accessToken = user?.accessToken;

    // Add Authorization header if accessToken exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error) // Forward request errors
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Forward successful responses
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Unauthorized: Clear Zustand store and redirect to login
      const { logout } = useAuthStore.getState();
      logout(); // Clear authentication state

      // Redirect to login page
      window.location.href = "/admin/sign-in";
    }

    return Promise.reject(error); // Forward error responses
  }
);

export default axiosInstance;
