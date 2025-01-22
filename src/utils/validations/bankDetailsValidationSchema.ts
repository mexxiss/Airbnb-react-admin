import * as Yup from "yup";

const bankDetailsValidationSchema = Yup.object().shape({
  accountHolderName: Yup.string()
    .trim()
    .required("Account holder name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),

  bankName: Yup.string()
    .trim()
    .required("Bank name is required")
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed"),

  currency: Yup.string()
    .trim()
    .required("Currency is required")
    .length(3, "Currency should be a 3-letter code (e.g. USD)"),

  iban: Yup.string()
    .trim()
    .required("IBAN is required")
    .matches(
      /^[A-Z0-9]+$/,
      "IBAN should contain only uppercase letters and numbers"
    )
    .min(15, "IBAN should be at least 15 characters")
    .max(34, "IBAN should not exceed 34 characters"),

  accountNumber: Yup.string()
    .trim()
    .required("Account number is required")
    .matches(/^[0-9]+$/, "Account number should contain only numbers")
    .min(8, "Account number should be at least 8 digits")
    .max(18, "Account number should not exceed 18 digits"),

  address: Yup.string()
    .trim()
    .required("Address is required")
    .min(5, "Address should be at least 5 characters long")
    .max(100, "Address should not exceed 100 characters"),
});

export default bankDetailsValidationSchema;
