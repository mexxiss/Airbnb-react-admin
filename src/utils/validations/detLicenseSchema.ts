import * as Yup from "yup";

export const detLicenseSchema = Yup.object().shape({
  licenseNumber: Yup.string().required("License number is required").trim(),
  owner: Yup.string().required("Owner is required"),
  property: Yup.string().required("Property is required"),
  status: Yup.string().oneOf(["paid", "unpaid"]).required("Status is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  issueDate: Yup.date().required("Issue date is required"),
  expiryDate: Yup.date().required("Expiry date is required"),
  renewed: Yup.boolean(),
  renewalDate: Yup.date().when("renewed", (renewed, schema) => {
    return renewed[0]
      ? schema.required("Renewal date is required when renewed is true")
      : schema;
  }),
});
