import parsePhoneNumberFromString from "libphonenumber-js";
import * as Yup from "yup";
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const phoneValidation = (isMultiple: boolean) => {
  if (isMultiple) {
    return Yup.array()
      .of(
        Yup.string()
          .test(
            "is-valid-phone",
            "One or more phone numbers are invalid.",
            (value) => {
              const finVal = `+${value}`;
              if (!finVal) return false;
              const phoneNumber = parsePhoneNumberFromString(finVal);
              return phoneNumber?.isValid() ?? false;
            }
          )
          .required("Phone number is required")
      )
      .required("At least one phone number is required")
      .min(1, "At least one phone number is required");
  } else {
    return Yup.string()
      .test("is-valid-phone", "Please enter a valid phone number", (value) => {
        const finVal = `+${value}`;
        if (!finVal) return false;

        const phoneNumber = parsePhoneNumberFromString(finVal);

        return phoneNumber?.isValid() ?? false;
      })
      .required("Phone number is required");
  }
};

export const editDetailValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string()
    .required("Please enter your email")
    .email("Invalid email format")
    .matches(EMAIL_REGEX, "Invalid email: example@mail.abc"),
  phone: phoneValidation(false),
});
