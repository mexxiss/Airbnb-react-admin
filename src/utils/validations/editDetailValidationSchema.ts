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
        console.log({ value });

        const finVal = `+${value}`;
        if (!finVal) return false;

        const phoneNumber = parsePhoneNumberFromString(finVal);

        return phoneNumber?.isValid() ?? false;
      })
      .required("Phone number is required");
  }
};

export const personalDetailsValidationSchema = (isMultiple = false) => {
  const schema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Please enter your email")
      .email("Invalid email format")
      .matches(EMAIL_REGEX, "Invalid email: example@mail.abc"),
    phone: Yup.string()
      .required("Phone number is required")
      .test("len", "Phone number must be valid", (val) => {
        if (val) {
          const numericValue = val.replace(/\D/g, "");
          return numericValue.length >= 10 && numericValue.length <= 15;
        }
        return false;
      }),
    SecEmail: Yup.string()
      .email("Invalid email format")
      .matches(EMAIL_REGEX, "Invalid email: example@mail.abc"),
    SecNumber: Yup.string().test("len", "Phone number must be valid", (val) => {
      if (val) {
        const numericValue = val.replace(/\D/g, "");
        return numericValue.length >= 10 && numericValue.length <= 15;
      }
      return true; // Allow empty string for optional secondary number
    }),
    country: Yup.string(),
  });

  if (isMultiple) {
    return Yup.array().of(schema);
  } else {
    return schema;
  }
};

export const addressValidationSchema = (isMultiple = false) => {
  const schema = Yup.object({
    building_no: Yup.string(),
    street: Yup.string(),
    city: Yup.string().required("City is required"),
    area: Yup.string().required("Area is required"),
    landmark: Yup.string(),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string().required("Pincode is required"),
  });

  if (isMultiple) {
    return Yup.array().of(schema);
  } else {
    return schema;
  }
};
