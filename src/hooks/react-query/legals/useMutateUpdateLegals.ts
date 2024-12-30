import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { createLegalsApi } from "../../../services/apiServices";

interface useMutateUpdateLegalsPayload {
  title: string;
  body: string;
  type: string;
}

export const useMutateUpdateLegals = () => {
  return useMutation({
    mutationFn: (payload: useMutateUpdateLegalsPayload) =>
      createLegalsApi(payload),
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
