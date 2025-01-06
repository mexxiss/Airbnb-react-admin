import { useQuery } from "@tanstack/react-query";
import { fetchFurnishingDetailsById } from "../../../services/apiServices";

interface UseFetchFurnishingDataByIdParams {
  id: string;
}

export const useFetchFurnishingDataById = ({
  id,
}: UseFetchFurnishingDataByIdParams) => {
  return useQuery({
    queryKey: ["furnishingDataById", id],
    queryFn: () => fetchFurnishingDetailsById(id),
    enabled: !!id,
  });
};
