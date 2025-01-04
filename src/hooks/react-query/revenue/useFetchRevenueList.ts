import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyInvoiceRevenueList } from "../../../services/apiServices";

export const useFetchRevenueList = () => {
  return useQuery<any, Error>({
    queryKey: ["revenueList"],
    queryFn: () => fetchMonthlyInvoiceRevenueList(),
  });
};
