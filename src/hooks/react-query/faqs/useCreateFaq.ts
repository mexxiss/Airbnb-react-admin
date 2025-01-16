import { useMutation } from "@tanstack/react-query";
import { createFaq } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: createFaq,
    onSuccess: () => {
      showToast("success", "FAQ created successfully!");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to create FAQ"
      );
    },
  });
};
