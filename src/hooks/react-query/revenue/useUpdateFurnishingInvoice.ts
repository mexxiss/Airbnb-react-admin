import { useMutation } from "@tanstack/react-query";
import { updateFurnishingInvoice } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { FurnishingFormData } from "../../../types/furnishingTypes";

interface IFurnishingProps {
  id: string;
  invoiceData: FurnishingFormData;
}
export const useUpdateFurnishingInvoice = () => {
  return useMutation({
    mutationFn: ({ id, invoiceData }: IFurnishingProps) =>
      updateFurnishingInvoice(id, invoiceData),
    onSuccess: (data) => {
      showToast(
        "success",
        data.message || "Furnishing Invoice Update successfully"
      );
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error.message ||
          "Furnishing Invoice Update failed"
      );
    },
  });
};
