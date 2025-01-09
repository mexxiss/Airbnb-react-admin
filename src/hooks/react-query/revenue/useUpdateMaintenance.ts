import { useMutation } from "@tanstack/react-query";
import { updateMaintenanceInvoice } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { MaintenanceFormValues } from "../../../types/maintenanceTypes";

interface IFurnishingProps {
  id: string;
  invoiceData: MaintenanceFormValues;
}
export const useUpdateMaintenance = () => {
  return useMutation({
    mutationFn: ({ id, invoiceData }: IFurnishingProps) =>
      updateMaintenanceInvoice(id, invoiceData),
    onSuccess: (data) => {
      showToast(
        "success",
        data.message || "Maintenance Invoice Update successfully"
      );
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error.message ||
          "Maintenance Invoice Update failed"
      );
    },
  });
};
