import { useMutation } from "@tanstack/react-query";
import { updateFaq } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { Faq } from "../../../types/faqTypes";

export const useUpdateFaq = () => {
  return useMutation({
    mutationFn: ({ id, faq }: { id: string; faq: Partial<Faq> }) =>
      updateFaq(id, faq),
    onSuccess: () => {
      showToast("success", "FAQ updated successfully!");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to update FAQ"
      );
    },
  });
};
