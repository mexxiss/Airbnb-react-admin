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
      showToast(
        "success",
        data.message || "Legal document section saved successfully"
      );
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Legal document section saved successfully"
      );
    },
  });
};
