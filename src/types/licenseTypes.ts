export interface LicenseRequestPayload {
  licenseNumber: string;
  owner: string;
  property: string;
  status: "paid" | "unpaid";
  price: number;
  issueDate: string;
  expiryDate: string;
  renewed?: boolean;
  renewalDate?: string;
  _id?: string;
  createdAt?: string;
}

interface IData {
  licenses: LicenseRequestPayload[];
  currentPage: number;
  totalPages: number;
  totalLicenses: number;
}

export interface LicenseResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: IData;
}

export interface SingleLicenseApiResponse {
  statusCode: number;
  data: LicenseData;
  message: string;
  success: boolean;
}

export interface LicenseData {
  _id?: string;
  licenseNumber: string;
  owner:
    | string
    | {
        _id?: string;
        first_name?: string;
        last_name?: string;
      };
  property:
    | string
    | {
        _id?: string;
        title?: string;
      };
  status: string;
  price: number;
  renewed: boolean;
  renewalDate?: string;
  issueDate: string;
  expiryDate: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
