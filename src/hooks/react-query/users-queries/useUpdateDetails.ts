import { useMutation } from "@tanstack/react-query";
import { updateAminDetails } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const useUpdateDetails = () => {
  return useMutation({
    mutationFn: ({ data }: { data: Record<string, any> }) =>
      updateAminDetails(data),
    onSuccess: (response) => {
      showToast(
        "success",
        response?.message || "User details updated successfully"
      );
    },
    onError: (error: any) => {
      console.log({ error });

      showToast(
        "error",
        error?.response.data.error ||
          "Failed to update user details. Please try again."
      );
    },
  });
};
