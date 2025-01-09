import { useQuery } from "@tanstack/react-query";
import { fetchMaintenanceInvoiceList } from "../../../services/apiServices";

export const useFetchMaintenanceInvoice = () => {
  return useQuery<any, Error>({
    queryKey: ["maintenanceInvoiceList"],
    queryFn: () => fetchMaintenanceInvoiceList(),
  });
};
