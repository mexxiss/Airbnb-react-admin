import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { updateProperty } from "../../../services/apiServices";

interface UseUpdatePropertiesPayload {
  id: string;
  updates: Record<string, any>;
}

export const useUpdateProperties = () => {
  return useMutation({
    mutationFn: ({ id, updates }: UseUpdatePropertiesPayload) =>
      updateProperty(id, { updates }),
    onSuccess: (data) => {
      showToast("success", data.message);
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Property Update failed"
      );
    },
  });
};
