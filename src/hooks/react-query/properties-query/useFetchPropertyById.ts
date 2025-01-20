import { useQuery } from "@tanstack/react-query";
import { fetchPropertyById } from "../../../services/apiServices";

interface UseFetchPropertyByIdParams {
  propertyId: string;
}

export const useFetchPropertyById = ({
  propertyId,
}: UseFetchPropertyByIdParams) => {
  return useQuery({
    queryKey: ["propertyDetails", propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    enabled: !!propertyId,
  });
};
