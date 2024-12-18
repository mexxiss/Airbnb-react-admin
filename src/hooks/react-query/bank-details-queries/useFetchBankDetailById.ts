import { useQuery } from "@tanstack/react-query";
import { fetchUserBankDetailsById } from "../../../services/apiServices";

interface UseFetchBankDetailByIdParams {
  userId: string;
}

// Custom React Query hook for fetching user details by ID
export const useFetchBankDetailById = ({
  userId,
}: UseFetchBankDetailByIdParams) => {
  return useQuery({
    queryKey: ["userBankDetails", userId],
    queryFn: () => fetchUserBankDetailsById(userId),
    enabled: !!userId,
  });
};
