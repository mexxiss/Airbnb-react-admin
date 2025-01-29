import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLicense } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { LicenseData } from "../../../types/licenseTypes";

export const useUpdateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; data: LicenseData }) =>
      updateLicense(payload),
    onSuccess: () => {
      showToast("success", "License updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["license"] });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Failed to update license"
      );
    },
  });
};
