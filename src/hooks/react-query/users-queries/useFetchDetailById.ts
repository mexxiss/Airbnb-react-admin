import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

interface UseFetchDetailByIdParams {
  userId: string;
}

// Custom React Query hook for fetching user details by ID
export const useFetchDetailById = ({ userId }: UseFetchDetailByIdParams) => {
  return useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  });
};
