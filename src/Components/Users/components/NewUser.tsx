import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import Input from "../../Input/Input";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { signupValidationSchema } from "../../../utils/validations/loginValidator";
import { useSignUpUser } from "../../../hooks/react-query/users-queries";
import CustomPhoneInput from "../../PhoneInput/CustomPhoneInput";

const NewUser = () => {
  const { mutate: signUp, isPending } = useSignUpUser();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      try {
        const updates = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: [values.email].filter(Boolean),
          password: values.password,
        };
        console.log({ updates });
        signUp(updates, {
          onSuccess: (data) => {
            console.log("Local Success Handler:", data);
            if (data.data) {
              navigate(`/admin/user/${data.data}`);
            }
          },
          onError: (error) => {
            console.error("Local Error Handler:", error);
            showToast("error", "Failed to create user.");
          },
        });
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });
  return (
    <div>
      <h6 className="text-lg text-text1 font-semibold">Create User</h6>
      <div className="mt-3">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Input Fields */}
              <div className="flex flex-col gap-1">
                <Input
                  name="first_name"
                  label="First Name"
                  type="text"
                  placeholder="Enter First Name"
                />
                {formik.errors.first_name && formik.touched.first_name && (
                  <span className="text-red-600">
                    {formik.errors.first_name}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  name="last_name"
                  label="Last Name"
                  type="text"
                  placeholder="Enter Last Name"
                />
                {formik.errors.last_name && formik.touched.last_name && (
                  <span className="text-red-600">
                    {formik.errors.last_name}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <CustomPhoneInput
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  country="ae"
                  formik={formik}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter Email"
                />
                {formik.errors.email && formik.touched.email && (
                  <span className="text-red-600">{formik.errors.email}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter Password"
                />
                {formik.errors.password && formik.touched.password && (
                  <span className="text-red-600">{formik.errors.password}</span>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-primary hover:bg-primary-dark"
              >
                Create User
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default NewUser;
