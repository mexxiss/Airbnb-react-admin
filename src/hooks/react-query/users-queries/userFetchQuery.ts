import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../services/apiServices";
import { ApiResponse } from "../../../types/usersTypes";
import useDebounce from "../../custom-hook/useDebounce";

const fetchFilteredData = async (filters: {
  dates: Date[];
  isDeleted: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const { dates, isDeleted, searchTerm, page, limit } = filters;

  // Initialize URLSearchParams for dynamic query building
  const query = new URLSearchParams();

  // Append date range if provided
  if (dates.length === 2) {
    query.append("startDate", dates[0].toISOString());
    query.append("endDate", dates[1].toISOString());
  }

  if (isDeleted && isDeleted !== "all") {
    query.append("isDeleted", isDeleted);
  }

  if (searchTerm) {
    query.append("searchTerm", searchTerm);
  }

  query.append("page", page.toString());
  query.append("limit", limit.toString());

  try {
    const response = await fetchUsers(query.toString());
    if (response.status !== 200) {
      throw new Error("Failed to fetch filtered data");
    }
    return await response.data;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};
export const userFetchQuery = ({
  dates,
  searchTerm,
  isDeleted,
  limit,
  page,
}: {
  dates: Date[];
  isDeleted: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const debouncedFilters = useDebounce(
    { dates, isDeleted, page, limit, searchTerm },
    500
  );
  return useQuery<ApiResponse>({
    queryKey: ["users", debouncedFilters],
    queryFn: () => fetchFilteredData(debouncedFilters),
    placeholderData: keepPreviousData,
    enabled: true,
  });
};
