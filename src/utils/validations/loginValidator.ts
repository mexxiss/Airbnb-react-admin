import parsePhoneNumberFromString from "libphonenumber-js";

import * as Yup from "yup";
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format")
    .matches(EMAIL_REGEX, "Invalid email: example@mail.abc"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const signupValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.array()
    .of(
      Yup.string()
        .required("Phone number is required")
        .test(
          "isValidPhone",
          "One or more phone numbers are invalid.",
          (val) => {
            if (val) {
              const phoneNumber = parsePhoneNumberFromString(val);
              return phoneNumber ? phoneNumber.isValid() : false;
            }
            return false;
          }
        )
    )
    .min(1, "At least one phone number is required"),
});
