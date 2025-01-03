import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyInvoiceRevenue } from "../../../services/apiServices";

interface UseFetchRevenueProps {
  selectedValue?: string; // User ID
  selectedProperty?: string; // Property ID
  selectedMonth?: string; // Target Month
}

export const useFetchRevenue = ({
  selectedValue,
  selectedProperty,
  selectedMonth,
}: UseFetchRevenueProps) => {
  return useQuery<any, Error>({
    queryKey: ["revenueData", selectedValue, selectedProperty, selectedMonth],
    queryFn: () =>
      fetchMonthlyInvoiceRevenue(
        selectedProperty!,
        selectedMonth!,
        selectedValue!
      ),
    enabled: !!selectedValue && !!selectedProperty && !!selectedMonth, // Only fetch when inputs are valid
    placeholderData: {}, // Optional: Provide default structure
    retry: 1, // Retry once on failure
  });
};
