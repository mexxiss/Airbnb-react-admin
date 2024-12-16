import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/apiServices";
import { LoginFormInputs } from "../../../types/loginTypes";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormInputs) => login(data),
    onSuccess: (data) => {
      showToast("success", "Login successful!");
      navigate("/admin/dashboard");
    },
    onError: (error: any) => {
      showToast("error", error?.response?.data?.message || "Login failed");
    },
  });
};
