import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyInvoiceRevenueList } from "../../../services/apiServices";
import useDebounce from "../../custom-hook/useDebounce";

export const useFetchRevenueList = (searchTerm: string = "") => {
  const debouncedSearchTerm = useDebounce(searchTerm || "", 900);
  return useQuery<any, Error>({
    queryKey: ["revenueList", debouncedSearchTerm], // Use debounced value here
    queryFn: () => fetchMonthlyInvoiceRevenueList(debouncedSearchTerm), // And here
    enabled: true,
  });
};
