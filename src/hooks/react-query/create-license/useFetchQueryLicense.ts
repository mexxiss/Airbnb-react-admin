import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLicenseList } from "../../../services/apiServices";
import { ApiResponse } from "../../../types/usersTypes";
import useDebounce from "../../custom-hook/useDebounce";
import { LicenseResponse } from "../../../types/licenseTypes";

const fetchFilteredData = async (filters: {
  dates: Date[];
  status: string;
  searchTerm?: string;
  page: number;
  limit: number;
}) => {
  const { dates, status, searchTerm, page, limit } = filters;

  // Initialize URLSearchParams for dynamic query building
  const query = new URLSearchParams();

  // Append date range if provided
  if (dates.length === 2) {
    query.append("startDate", dates[0].toISOString());
    query.append("endDate", dates[1].toISOString());
  }

  // Filter by status
  if (status && status !== "all") {
    query.append("status", status);
  }

  // Filter by searchTerm
  if (searchTerm) {
    query.append("searchTerm", searchTerm);
  }

  // Pagination
  query.append("page", page.toString());
  query.append("limit", limit.toString());

  try {
    const response = await getLicenseList(query.toString());
    if (response.statusCode !== 200) {
      throw new Error("Failed to fetch filtered data");
    }
    return response;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
};

export const useFetchQueryLicense = ({
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
  return useQuery<LicenseResponse>({
    queryKey: ["license", debouncedFilters],
    queryFn: () => fetchFilteredData(debouncedFilters),
    placeholderData: keepPreviousData,
    enabled: true,
  });
};
