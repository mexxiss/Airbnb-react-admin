import { AxiosResponse } from "axios";
import { ChangePasswordProps, LoginFormInputs } from "../types/loginTypes";
import { User } from "../types/usersTypes";
import axiosInstance from "./axiosInstance";
import { PropertyResponse } from "../types/propertiesTypes";

// Example: Login Method
export const login = async (data: LoginFormInputs): Promise<any> => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};

// Example: Fetch User Profile
export const fetchUserProfile = async (): Promise<any> => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

// Example: Update User Details
export const updateUserDetails = async (
  data: Record<string, any>
): Promise<any> => {
  const response = await axiosInstance.put("/users/update", data);
  return response.data;
};

// Example: Logout Method
export const logout = async (): Promise<any> => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordProps
): Promise<any> => {
  const response = await axiosInstance.post("/users/change-pass", data);
  return response.data;
};

export const fetchUsers = async (
  page: number,
  limit: number = 10
): Promise<{
  data: any[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}> => {
  const response = await axiosInstance.get(
    `/admin/users?page=${page}&limit=${limit}`
  );
  return response.data;
};

interface DeletePropes {
  message: string;
  data: User;
}

export const toggleUserDeletedStatus = async (
  id: string
): Promise<DeletePropes> => {
  const response = await axiosInstance.delete(`/admin/users/${id}`);
  return response.data;
};

//** properties services */

export const fetchProperties = async (
  page: number,
  limit: number = 10
): Promise<{
  data: any[];
  currentPage: number;
  totalPages: number;
  totalProperties: number;
}> => {
  const response = await axiosInstance.get(
    `/admin/properties?page=${page}&limit=${limit}`
  );
  return response.data;
};

//** Update properties */

interface UpdatePropertyPayload {
  updates: Record<string, any>; // Generic object to handle dynamic update fields
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

// Service method to update a property
export const updateProperty = async (
  propertyId: string,
  payload: UpdatePropertyPayload
): Promise<ApiResponse<PropertyResponse>> => {
  try {
    const response: AxiosResponse<ApiResponse<PropertyResponse>> =
      await axiosInstance.put(`/admin/properties/${propertyId}`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update the property."
    );
  }
};
