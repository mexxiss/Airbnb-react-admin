import { useMutation } from "@tanstack/react-query";
import { createFurnishingInvoice } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { FurnishingFormData } from "../../../types/furnishingTypes";

export const useCreateFurnishingInvoice = () => {
  return useMutation({
    mutationFn: (invoiceData: FurnishingFormData) =>
      createFurnishingInvoice(invoiceData),
    onSuccess: (data) => {
      showToast(
        "success",
        data.message || "Furnishing Invoice created successfully"
      );
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error.message ||
          "Furnishing Invoice creation failed"
      );
    },
  });
};
