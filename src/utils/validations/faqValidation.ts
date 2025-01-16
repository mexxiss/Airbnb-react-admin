import * as Yup from "yup";

export const faqValidationSchema = Yup.object({
  question: Yup.string()
    .required("Question is required")
    .min(5, "Question must be at least 5 characters long"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer must be at least 10 characters long"),
  page: Yup.array().of(Yup.string()).min(1, "Please select at least one page"),
});
