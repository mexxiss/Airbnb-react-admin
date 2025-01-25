import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { createInvoice, InvoicePayload } from "../../../services/apiServices";
import { PropertiesPostResponse } from "../../../types/propertiesTypes";

interface UseCreateInvoicePayload {
  invoiceData: InvoicePayload;
}

export const useCreateInvoice = () => {
  return useMutation<
    PropertiesPostResponse<any>,
    Error,
    UseCreateInvoicePayload
  >({
    mutationFn: ({ invoiceData }: UseCreateInvoicePayload) =>
      createInvoice(invoiceData),
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
