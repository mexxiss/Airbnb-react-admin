export interface LoginFormInputs {
  email: string;
  password: string;
}

interface Address {
  street: string;
  country: string;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string[];
  phone: string[];
  password: string;
  isLoggedIn: boolean;
  role: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  profile_img?: string;
}

export interface ChangePasswordProps {
  current_pass: string | null;
  new_pass: string | null;
}
