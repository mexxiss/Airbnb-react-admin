interface ManagementFee {
  percentage: number;
  amount: number;
}

interface Expense {
  description: string;
  amount: number;
}

interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  statementPeriod: string;
}

interface Summary {
  totalIncome: number;
  managementFee: ManagementFee;
  expenses: Expense[];
  netAmountDue: number;
}

export interface MonthlyInvoiceRevenueResponse {
  invoiceDetails: InvoiceDetails;
  reservations: any[];
  summary: Summary;
  footer: string;
}
