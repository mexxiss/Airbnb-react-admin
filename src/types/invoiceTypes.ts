// ----------------------------------------------------------------------

import { Address } from "./usersTypes";

export type IInvoiceTableFilterValue = string | string[] | Date | null;

export type IInvoiceTableFilters = {
  name: string;
  service: string[];
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

interface IAddress {
  addressType: string;
  company: string;
  email: string;
  fullAddress: string;
  id: string;
  name: string;
  phoneNumber: string;
  primary: boolean;
}

// ----------------------------------------------------------------------

export type IInvoiceItem = {
  id: string;
  title: string;
  price: number;
  total: number;
  service: string;
  quantity: number;
  description: string;
};

export type IInvoice = {
  id: string;
  sent: number;
  status: string;
  totalAmount: number;
  invoiceNumber: string;
  subTotal: number;
  items: IInvoiceItem[];
  taxes: number | string;
  dueDate: Date | number;
  discount: number | string;
  shipping: number | string;
  createDate: Date | number;
  invoiceTo: IAddress;
  invoiceFrom: IAddress;
};
