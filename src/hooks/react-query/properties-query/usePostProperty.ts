import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { createProperty } from "../../../services/apiServices";
import { PropertyResponse } from "../../../types/propertiesTypes";

interface UseCreatePropertyPayload {
  propertyData: Omit<PropertyResponse, "_id" | "createdAt" | "updatedAt">;
}

export const useCreateProperty = () => {
  return useMutation({
    mutationFn: ({ propertyData }: UseCreatePropertyPayload) =>
      createProperty(propertyData),
    onSuccess: (data) => {
      showToast("success", data.message || "Property created successfully");
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message || "Property creation failed"
      );
    },
  });
};
