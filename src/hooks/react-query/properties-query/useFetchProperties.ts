import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../../../services/apiServices";
import { ApiResponseProperties } from "../../../types/propertiesTypes";
import useDebounce from "../../custom-hook/useDebounce";
import { useMemo } from "react";

const fetchFilteredData = async (filters: {
  dates: Date[];
  status: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const { dates, status, searchTerm, page, limit } = filters;

  const query = new URLSearchParams();

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
    return response;
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
  const filters = useMemo(
    () => ({ dates, status, page, limit, searchTerm }),
    [dates, status, page, limit, searchTerm]
  );

  const debouncedFilters = useDebounce(filters, 300);

  return useQuery<ApiResponseProperties>({
    queryKey: ["properties", debouncedFilters],
    queryFn: () => fetchFilteredData(debouncedFilters),
    placeholderData: keepPreviousData,
    enabled:
      true ||
      !!debouncedFilters.searchTerm ||
      !!debouncedFilters.status ||
      debouncedFilters.dates.length > 0,
  });
};
