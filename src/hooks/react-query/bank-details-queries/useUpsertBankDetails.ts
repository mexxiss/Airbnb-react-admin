import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { upsertBankDetails } from "../../../services/apiServices";

interface UseUpsertBankDetailsPayload {
  userId: string;
  details: Record<string, any>;
}

export const useUpsertBankDetails = () => {
  return useMutation({
    mutationFn: ({ userId, details }: UseUpsertBankDetailsPayload) =>
      upsertBankDetails(userId, details),
    onSuccess: (data) => {
      console.log({ data });

      showToast("success", data.message || "Bank details updated successfully");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Bank details update failed"
      );
    },
  });
};
