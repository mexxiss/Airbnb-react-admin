export interface Faq {
  question: string;
  answer: string;
  page?: string[];
}

export interface FaqProps {
  _id: string;
  question: string;
  answer: string;
  page: string[];
  __v: number;
}

export interface FaqResponse {
  statusCode: number;
  data: FaqProps[];
  message: string;
  success: boolean;
}
