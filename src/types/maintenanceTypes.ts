export interface MaintenanceFormValues {
  property_id: string;
  taxInvoiceNumber?: string;
  trnNumber?: string;
  essentialWorksImages: {
    url: string;
    work_name: string;
  }[];
  essentialWorks: {
    itemService: string;
    quantity: number;
    priceUnit: number;
    priceSummary: number;
  }[];
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
  subtotal: number;
  tax?: number;
  totalMaintenceCost: number;
  receivedAmount: number;
  amountOwedToFP: number;
  bank_details: string;
  notes: string;
  statementPeriod: string;
}
