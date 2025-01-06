import { useQuery } from "@tanstack/react-query";
import { fetchFurnishingInvoiceList } from "../../../services/apiServices";

export const useFetchFurnishingInvoice = () => {
  return useQuery<any, Error>({
    queryKey: ["furnishingInvoice"],
    queryFn: () => fetchFurnishingInvoiceList(),
  });
};
