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
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    iban: string;
    swiftCode: string;
  };
  notes: string;
}
