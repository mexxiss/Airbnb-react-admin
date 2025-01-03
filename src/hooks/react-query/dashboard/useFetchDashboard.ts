import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../../../services/apiServices";

export const useFetchDashboard = () => {
  return useQuery({
    queryKey: ["admindashboard"],
    queryFn: fetchDashboardData,
  });
};
