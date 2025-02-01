import * as Yup from "yup";

export const legalContentValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body content is required"),
  type: Yup.string()
    .required("Type is required")
    .oneOf(
      ["terms", "privacy", "refund", "booking_refund", "booking_privacy", "booking_terms"],
      "Type must be one of 'terms', 'policy', 'refund', 'booking_refund', 'booking_privacy', or 'booking_terms'"
    ),
});

export const validationSchemaAbout = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body content is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

export const contactQuerySchema = Yup.object().shape({
  reply: Yup.string().required("Message is required"),
  status: Yup.string().required("Status is required"),
});
