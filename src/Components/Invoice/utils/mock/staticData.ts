import { IInvoice, IMonthlyInvoice } from "../../../../types/invoiceTypes";

export const invoiceData: IInvoice = {
  createDate: new Date("Mon Dec 30 2024 14:09:37 GMT+0530"),
  discount: 85.21,
  dueDate: new Date("Thu Jan 16 2025 15:09:37 GMT+0530"),
  id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
  invoiceFrom: {
    addressType: "Office",
    company: "Nikolaus - Leuschke",
    email: "milo.farrell@hotmail.com",
    fullAddress: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
    name: "Lucian Obrien",
    phoneNumber: "904-966-2836",
    primary: false,
  },
  invoiceNumber: "INV-1991",
  invoiceTo: {
    addressType: "Office",
    company: "Hegmann, Kreiger and Bayer",
    email: "violet.ratke86@yahoo.com",
    fullAddress: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
    name: "Deja Brady",
    phoneNumber: "399-757-9909",
    primary: false,
  },
  items: [
    {
      description:
        "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
      price: 83.74,
      quantity: 11,
      service: "HR Manager",
      title: "Nike Air Force 1 NDESTRUKT",
      total: 921.14,
    },
    {
      description:
        "She eagerly opened the gift, her eyes sparkling with excitement.",
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      price: 97.14,
      quantity: 10,
      service: "Data Analyst",
      title: "Foundations Matte Flip Flop",
      total: 971.4,
    },
    {
      description:
        "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
      price: 68.71,
      quantity: 7,
      service: "Legal Counsel",
      title: "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
      total: 480.97,
    },
  ],
  sent: 10,
  shipping: 52.17,
  status: "paid",
  subTotal: 2373.51,
  taxes: 68.71,
  totalAmount: 2304.84,
};

export const mockInvoice: IMonthlyInvoice = {
  companyDetails: {
    name: "Frank Porter Vacation Homes Rental L.L.C",
    address: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
    phone: "+1 802-448-2354",
  },
  ownerDetails: {
    name: "Surinder Saini Paul Harbans",
    address: "18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337",
    phone: "+1 802-448-2354",
  },
  invoiceDetails: {
    invoiceNumber: "INV-1991",
    date: "2025-01-02",
    statementPeriod: "2024/11",
  },
  reservations: [
    {
      reservationCode: "RS-dwekjwdsc",
      guestName: "Inder",
      checkIn: "2024-10-27",
      checkOut: "2024-10-30",
      totalNights: 3,
      netRentalIncome: 1803,
    },
    {
      reservationCode: "RS-dwelawdsc",
      guestName: "Jagjit",
      checkIn: "2025-1-1",
      checkOut: "2024-1-1",
      totalNights: 9,
      netRentalIncome: 3000,
    },
  ],
  summary: {
    totalIncome: 4803,
    managementFee: {
      percentage: 17,
      amount: 303,
    },
    expenses: [
      {
        description: "DET License Fee",
        amount: 370,
      },
    ],
    netAmountDue: 1130,
  },
  footer: "Kind regards,\nMexxstates",
};
