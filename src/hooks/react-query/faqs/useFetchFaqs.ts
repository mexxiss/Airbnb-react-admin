import { useQuery } from "@tanstack/react-query";
import { fetchUserFaqs } from "../../../services/apiServices";
import { FaqResponse } from "../../../types/faqTypes";
export const useFetchFaqs = (page: string) => {
  return useQuery<FaqResponse>({
    queryKey: ["faqs", page],
    queryFn: () => fetchUserFaqs(page),
    enabled: !!page,
  });
};
