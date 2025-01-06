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
