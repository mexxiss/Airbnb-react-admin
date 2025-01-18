import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({ folder, file }: { folder?: string; file: File }) =>
      uploadFile(folder || "properties", file),
    // onSuccess: (data) => {
    //   showToast("success", "File uploaded successfully.");
    // },
    // Handle errors gracefully
    onError: (error: any) => {
      console.error({ error });
      showToast(
        "error",
        error?.message || "Failed to upload the file. Please try again."
      );
    },
  });
};
