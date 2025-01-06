export interface FurnishingFormData {
  property_id: string;
  invoiceNumber: string;
  statementPeriod: string;
  companyDetails: {
    name: string;
    address: string;
    phone: string;
  };
  ownerDetails: {
    name: string;
    address: string;
    phone: string;
  };
  status: "Paid" | "Overdue" | "Pending";
  furnishingDetails?: string;
  totalFurnishingCost: number;
  receivedAmount: number;
  amountOwedToFP: number;
  bank_details: string;
  notes: string;
}
interface PropertyFieldData {
  _id: string;
  title: string;
}
export interface FurnishingResponseInvoice {
  companyDetails: {
    name: string;
    address: string;
    phone: string;
  };
  ownerDetails: {
    name: string;
    address: string;
    phone: string;
  };
  _id: string;
  property_id: PropertyFieldData;
  invoiceNumber: string;
  statementPeriod: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft"; // Enum for status
  furnishingDetails: string; // HTML content as a string
  totalFurnishingCost: number;
  receivedAmount: number;
  amountOwedToFP: number;
  bank_details: {
    _id: string;
    accountHolderName: string;
    accountNumber: string;
    bankName: string;
    swiftCode: string;
    iban: string;
    paymentMethod: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    address: string;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
  notes: string;
  __v: number;
}
