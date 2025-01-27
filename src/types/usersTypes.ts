export interface Address {
  building_no: string;
  city: string;
  street: string;
  area: string;
  landmark: string;
  country: string;
  pincode: string;
}

export interface User {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email: string[];
  phone: string[];
  address?: Address;
  isDeleted?: boolean;
  isLoggedIn?: boolean;
  role?: string;
  profile_img?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse {
  data: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export interface OnlyPropertyUserApiResponse {
  success: boolean;
  data: User[];
}
