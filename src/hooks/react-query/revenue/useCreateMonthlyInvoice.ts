import { useMutation } from "@tanstack/react-query";
import { createMonthlyInvoice } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { IMonthlyInvoice } from "../../../types/invoiceTypes";

export const useCreateMonthlyInvoice = () => {
  return useMutation({
    mutationFn: (invoiceData: IMonthlyInvoice) =>
      createMonthlyInvoice(invoiceData),
    onSuccess: (data) => {
      showToast("success", data.message || "Invoice created successfully");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Invoice creation failed"
      );
    },
  });
};
