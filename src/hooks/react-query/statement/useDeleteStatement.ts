import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { deleteStatement } from "../../../services/apiServices";

interface UseDeleteStatementPayload {
  title: string;
}

export const useDeleteStatement = () => {
  return useMutation<{ message: string }, Error, UseDeleteStatementPayload>({
    mutationFn: ({ title }: UseDeleteStatementPayload) =>
      deleteStatement(title),
    onSuccess: (data) => {
      showToast("success", data.message || "Statement deleted successfully");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Statement deletion failed"
      );
    },
  });
};
