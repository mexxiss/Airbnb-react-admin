import { useQuery } from "@tanstack/react-query";
import { fetchMaintenanceInvoiceList } from "../../../services/apiServices";
import useDebounce from "../../custom-hook/useDebounce";

export const useFetchMaintenanceInvoice = (searchTerm: string = "") => {
  const debouncedSearchTerm = useDebounce(searchTerm, 900);
  return useQuery<any, Error>({
    queryKey: ["maintenanceInvoiceList", debouncedSearchTerm],
    queryFn: () => fetchMaintenanceInvoiceList(debouncedSearchTerm),
    enabled: true,
  });
};
