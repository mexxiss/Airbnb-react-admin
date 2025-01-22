import { useQuery } from "@tanstack/react-query";
import { fetchFurnishingInvoiceList } from "../../../services/apiServices";
import useDebounce from "../../custom-hook/useDebounce";

export const useFetchFurnishingInvoice = (searchTerm: string = "") => {
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  return useQuery<any, Error>({
    queryKey: ["furnishingInvoice", debouncedSearchTerm],
    queryFn: () => fetchFurnishingInvoiceList(debouncedSearchTerm),
    enabled: true,
  });
};
