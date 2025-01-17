import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFaq } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const useDeleteFaq = () => {
  return useMutation({
    mutationFn: deleteFaq,
    onSuccess: () => {
      showToast("success", "FAQ deleted successfully!");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to delete FAQ"
      );
    },
  });
};
