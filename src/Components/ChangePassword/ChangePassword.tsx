import React, { useState } from "react";
import { useFormik } from "formik";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { changePasswordSchema } from "../../utils/validations/loginValidator";
import { usePostChangePassword } from "../../hooks/react-query/auth/usePostChangePassword";

const AdminChangePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  /** mutation for change password */
  const { mutate: changePassword, isPending } = usePostChangePassword();

  const togglePassword = (): void => setShowPassword((prev) => !prev);
  const toggleCurrentPassword = (): void =>
    setShowCurrentPassword((prev) => !prev);
  const toggleConfirmPassword = (): void =>
    setShowConfirmPassword((prev) => !prev);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      const newObj = {
        current_pass: values.currentPassword,
        new_pass: values.newPassword,
      };

      changePassword(newObj, {
        onSuccess: () => {
          formik.resetForm();
        },
      });
    },
  });

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <h5 className="text-22 text-primary font-bold mb-5">Change Password</h5>
        <div className="flex items-center justify-center">
          <form
            className="mt-5 w-full max-w-[420px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="text-[15px] text-[#8B8B8B]">
                Current password
              </label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                  placeholder="Enter current password"
                  {...formik.getFieldProps("currentPassword")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={toggleCurrentPassword}
                >
                  {showCurrentPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined className="!text-lg" />
                  )}
                </button>
              </div>
              {formik.touched.currentPassword &&
                formik.errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.currentPassword}
                  </p>
                )}
            </div>

            <div className="mb-4">
              <label className="text-[15px] text-[#8B8B8B]">New password</label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                  placeholder="Create a new password"
                  {...formik.getFieldProps("newPassword")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined className="!text-lg" />
                  )}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="text-[15px] text-[#8B8B8B]">
                Confirm password
              </label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                  placeholder="Confirm a new password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined className="!text-lg" />
                  )}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-primary text-white font-medium rounded-full"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChangePassword;
