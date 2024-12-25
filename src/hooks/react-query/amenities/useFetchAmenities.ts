// hooks/useAmenities.ts

import { useQuery } from "@tanstack/react-query";
import { Amenity } from "../../../types/amenitiesTypes";
import { fetchAmenities } from "../../../services/apiServices";

export const useFetchAmenities = () => {
  return useQuery<any>({
    queryKey: ["amenities"],
    queryFn: fetchAmenities,
  });
};
