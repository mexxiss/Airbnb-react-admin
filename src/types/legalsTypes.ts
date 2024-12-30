export interface LegalContent {
  _id?: {
    $oid: string;
  };
  title: string;
  body: string;
  type: string;
}

export interface LegalContentResponse {
  data: LegalContent;
  statusCode: number;
  message: string;
  success: boolean;
}

export interface AboutUsTypes {
  _id?: string;
  title: string;
  body: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
