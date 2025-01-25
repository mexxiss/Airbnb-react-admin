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
  createdAt?: string;
  updatedAt?: string;
}

interface Property {
  _id?: string;
  title?: string;
  user?: string;
}
export interface MaintenanceResponseValues {
  _id?: string;
  property_id: Property;
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
  isStatementGenrated?: boolean;
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
  notes: string;
  statementPeriod: string;
  createdAt?: string;
  updatedAt?: string;
}
