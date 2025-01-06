export interface BankDetails {
  _id: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
  iban: string;
  paymentMethod: string;
  user: {
    $oid: string;
  };
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
  address: string;
  currency: string;
}
