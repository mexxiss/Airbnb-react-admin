import { useQuery } from "@tanstack/react-query";
import {
  fetchFurnishingDetailsById,
  fetchMaintenanceInvoiceDetailsById,
} from "../../../services/apiServices";

interface UseFetchMaintenanceById {
  id: string;
}

export const useFetchMaintenanceById = ({ id }: UseFetchMaintenanceById) => {
  return useQuery({
    queryKey: ["maintenanceDataById", id],
    queryFn: () => fetchMaintenanceInvoiceDetailsById(id),
    enabled: !!id,
  });
};
