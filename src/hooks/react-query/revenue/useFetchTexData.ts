import { useQuery } from "@tanstack/react-query";
import { fetchUtilityData, UtilityData } from "../../../services/apiServices";

interface ResponseUtils {
  data: UtilityData;
}
export const useFetchTexData = () => {
  return useQuery<ResponseUtils, Error>({
    queryKey: ["texData"],
    queryFn: () => fetchUtilityData(),
  });
};
