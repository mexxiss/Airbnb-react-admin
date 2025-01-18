import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const validationSchemaUserUpdate = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.array()
    .of(
      Yup.string()
        .test(
          "is-valid-phone",
          "One or more phone numbers are invalid.",
          (value) => {
            if (!value) return false;
            const phoneNumber = parsePhoneNumberFromString(value);
            return phoneNumber?.isValid() ?? false;
          }
        )
        .required("Phone number is required")
    )
    .required("At least one phone number is required")
    .min(1, "At least one phone number is required"),
});
