import { useQuery } from "@tanstack/react-query";
import { fetchLegilesData } from "../../../services/apiServices";

interface UseFetchLegalsTypeParams {
  type: string;
}

export const useFetchLegals = ({ type }: UseFetchLegalsTypeParams) => {
  return useQuery({
    queryKey: ["legalsDeatils", type],
    queryFn: () => fetchLegilesData(type),
    enabled: !!type,
  });
};
