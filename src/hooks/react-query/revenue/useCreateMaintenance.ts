// createMaintenanceInvoice

import { useMutation } from "@tanstack/react-query";
import { createMaintenanceInvoice } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { MaintenanceFormValues } from "../../../types/maintenanceTypes";

export const useCreateMaintenance = () => {
  return useMutation({
    mutationFn: (invoiceData: MaintenanceFormValues) =>
      createMaintenanceInvoice(invoiceData),
    onSuccess: (data) => {
      showToast(
        "success",
        data.message || "Maintenance Invoice created successfully"
      );
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error.message ||
          "Maintenance Invoice creation failed"
      );
    },
  });
};
