import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../services/apiServices";
import { ApiResponse } from "../../../types/usersTypes";

export const userFetchQuery = (page: number, limit: number = 10) => {
  return useQuery<ApiResponse>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: keepPreviousData,
  });
};
