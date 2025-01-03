import { useQuery } from "@tanstack/react-query";
import { PropertiesResponse } from "../../../types/propertiesTypes";
import { fetchPropertiesByUser } from "../../../services/apiServices";

export const usePropertiesByUser = (
  userId: string | number | (string | number)[]
) => {
  return useQuery<PropertiesResponse, Error>({
    queryKey: ["userProperties", userId],
    queryFn: () => fetchPropertiesByUser(userId),
    enabled: !!userId,
  });
};
