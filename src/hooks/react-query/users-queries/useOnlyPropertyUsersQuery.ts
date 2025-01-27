import { useQuery } from "@tanstack/react-query";
import { OnlyPropertyUserApiResponse } from "../../../types/usersTypes";
import { fetchOnlyPropertyUser } from "../../../services/apiServices";

export const useOnlyPropertyUsersQuery = () => {
  return useQuery<OnlyPropertyUserApiResponse>({
    queryKey: ["users-with-properties"],
    queryFn: fetchOnlyPropertyUser,
    placeholderData: undefined,
    enabled: true,
  });
};
