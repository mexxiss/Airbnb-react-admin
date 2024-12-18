import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";
import {
  SignUpError,
  SignUpRequest,
  SignUpResponse,
} from "../../../types/signupUserTypes";

export const useSignUpUser = () => {
  return useMutation<SignUpResponse, SignUpError, SignUpRequest>({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      showToast("success", data.message || "User created successfully");
    },
    onError: (error) => {
      showToast(
        "error",
        error.message || "Failed to create user. Please try again."
      );
    },
  });
};
