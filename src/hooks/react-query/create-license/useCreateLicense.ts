import { useMutation } from "@tanstack/react-query";
import { createLicense } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { LicenseRequestPayload } from "../../../types/licenseTypes";

export const useCreateLicense = () => {
  return useMutation({
    mutationFn: (payload: LicenseRequestPayload) => createLicense(payload),
    onSuccess: () => {
      showToast("success", "License created successfully!");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create license"
      );
    },
  });
};
