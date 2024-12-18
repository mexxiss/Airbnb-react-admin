import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) =>
      updateUserDetails(id, data),
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
