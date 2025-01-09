import * as Yup from "yup";

export const maintenanceSchemaValidation = Yup.object().shape({
  property_id: Yup.string().required("Property ID is required"),
  essentialWorksImages: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().url("Invalid URL").required("Image URL is required"),
      work_name: Yup.string().required("Work name is required"),
    })
  ),
  essentialWorks: Yup.array().of(
    Yup.object().shape({
      itemService: Yup.string().required("Item Service is required"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("Quantity is required")
        .positive("Quantity must be positive"),
      priceUnit: Yup.number()
        .typeError("Price Unit must be a number")
        .required("Price Unit is required")
        .positive("Price Unit must be positive"),
      priceSummary: Yup.number()
        .typeError("Price Summary must be a number")
        .required("Price Summary is required")
        .positive("Price Summary must be positive"),
    })
  ),
  companyDetails: Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    address: Yup.string().required("Company address is required"),
    phone: Yup.string().required("Company phone is required"),
  }),
  ownerDetails: Yup.object().shape({
    name: Yup.string().required("Owner name is required"),
    address: Yup.string().required("Owner address is required"),
    phone: Yup.string().required("Owner phone is required"),
  }),
  subtotal: Yup.number()
    .typeError("Subtotal must be a number")
    .required("Subtotal is required")
    .positive("Subtotal must be positive"),
  totalMaintenceCost: Yup.number()
    .typeError("Total Maintenance Cost must be a number")
    .required("Total Maintenance Cost is required")
    .positive("Total Maintenance Cost must be positive"),
  receivedAmount: Yup.number()
    .typeError("Received Amount must be a number")
    .required("Received Amount is required")
    .positive("Received Amount must be positive"),
  amountOwedToFP: Yup.number()
    .typeError("Amount Owed must be a number")
    .required("Amount Owed is required")
    .positive("Amount Owed must be positive"),
  bank_details: Yup.string().required("Bank details are required"),
  tax: Yup.number().positive().required("Tax is required"),
  notes: Yup.string(),
});
