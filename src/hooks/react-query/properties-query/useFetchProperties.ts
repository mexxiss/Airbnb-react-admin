// ApiResponseProperties

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProperties } from "../../../services/apiServices";
import { ApiResponseProperties } from "../../../types/propertiesTypes";

export const useFetchProperties = (page: number, limit: number = 10) => {
  return useQuery<ApiResponseProperties>({
    queryKey: ["properties", page],
    queryFn: () => fetchProperties(page, limit),
    placeholderData: keepPreviousData,
  });
};
