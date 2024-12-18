export interface SignUpRequest {
  first_name: string;
  last_name: string;
  email: string[];
  password: string;
  role?: string;
  address?: string;
}

export interface SignUpResponse {
  status: number;
  data: string; // Assuming this is the `newUser._id` returned
  message: string;
}

export interface SignUpError {
  message: string;
}
