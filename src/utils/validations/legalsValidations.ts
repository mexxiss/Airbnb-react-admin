import * as Yup from "yup";

export const legalContentValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body content is required"),
  type: Yup.string()
    .required("Type is required")
    .oneOf(
      ["terms", "privacy", "refund"],
      "Type must be one of 'terms', 'policy', or 'refund'"
    ),
});

export const validationSchemaAbout = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body content is required"),
  images: Yup.array().min(1, "At least one image is required"),
});
