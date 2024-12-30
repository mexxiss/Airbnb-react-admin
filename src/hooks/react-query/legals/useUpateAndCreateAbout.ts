import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { createAboutsApi } from "../../../services/apiServices";

interface useMutateUpdateAboutPayload {
  title: string;
  body: string;
  images: string[];
}

export const useUpateAndCreateAbout = () => {
  return useMutation({
    mutationFn: (payload: useMutateUpdateAboutPayload) =>
      createAboutsApi(payload),
    onSuccess: (data) => {
      console.log({ data });

      showToast("success", data || "about us created/updated successfully");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data || "about us created/updated failed"
      );
    },
  });
};
