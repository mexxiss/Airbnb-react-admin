import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { toggleUserDeletedStatus } from "../../../services/apiServices";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => toggleUserDeletedStatus(id),
    onSuccess: (data) => {
      showToast("success", data.message);
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "User Status failed"
      );
    },
  });
};
