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
