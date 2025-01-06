import * as Yup from "yup";
import { stripHtml } from "../common";

export const furnishingValidationSchema = Yup.object({
  property_id: Yup.string().required("Property is required"),
  invoiceNumber: Yup.string().required("Invoice number is required"),
  statementPeriod: Yup.string().required("Statement period is required"),
  companyDetails: Yup.object({
    name: Yup.string().required("Company name is required"),
    address: Yup.string().required("Company address is required"),
    phone: Yup.string().required("Company phone is required"),
  }),
  ownerDetails: Yup.object({
    name: Yup.string().required("Owner name is required"),
    address: Yup.string().required("Owner address is required"),
    phone: Yup.string().required("Owner phone is required"),
  }),
  status: Yup.string().oneOf(["Paid", "Overdue", "Pending"]).default("Pending"),
  furnishingDetails: Yup.string().required("Furnishing details are required"),
  totalFurnishingCost: Yup.number()
    .required("Total furnishing cost is required")
    .min(0, "Must be a positive number"),
  receivedAmount: Yup.number()
    .required("Received amount is required")
    .min(0, "Must be a positive number"),
  amountOwedToFP: Yup.number()
    .required("Amount owed is required")
    .min(0, "Must be a positive number"),
  bank_details: Yup.string().required("Bank details are required"),
  notes: Yup.string().default(""),
});
