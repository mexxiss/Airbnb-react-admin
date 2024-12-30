// ApiResponseProperties

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../../../services/apiServices";
import { ApiResponseProperties } from "../../../types/propertiesTypes";
import useDebounce from "../../custom-hook/useDebounce";
const fetchFilteredData = async (filters: {
  dates: Date[];
  status: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const { dates, status, searchTerm, page, limit } = filters;
  console.log({ status });

  // Initialize URLSearchParams for dynamic query building
  const query = new URLSearchParams();

  // Append date range if provided
  if (dates.length === 2) {
    query.append("startDate", dates[0].toISOString());
    query.append("endDate", dates[1].toISOString());
  }

  if (status && status !== "all") {
    query.append("status", status);
  }

  if (searchTerm) {
    query.append("searchTerm", searchTerm);
  }

  query.append("page", page.toString());
  query.append("limit", limit.toString());

  try {
    const response = await fetchProperties(query.toString());
    console.log({ response });

    // if (response.status !== 200) {
    //   throw new Error("Failed to fetch filtered data");
    // }
    return await response;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};
export const useFetchProperties = ({
  dates,
  searchTerm,
  status,
  limit,
  page,
}: {
  dates: Date[];
  status: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const debouncedFilters = useDebounce(
    { dates, status, page, limit, searchTerm },
    500
  );
  return useQuery<ApiResponseProperties>({
    queryKey: ["properties", debouncedFilters],
    queryFn: () => fetchFilteredData(debouncedFilters),
    placeholderData: keepPreviousData,
    enabled: true,
  });
};
