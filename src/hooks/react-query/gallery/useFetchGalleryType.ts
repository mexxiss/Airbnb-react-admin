import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchGalleryTypes } from "../../../services/apiServices";
import { GalleryTypesResponse } from "../../../types/galleryTypes";

export const useFetchGalleryType = () => {
  return useQuery<GalleryTypesResponse>({
    queryKey: ["galleryTypes"],
    queryFn: fetchGalleryTypes,
    placeholderData: keepPreviousData,
  });
};
