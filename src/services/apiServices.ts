import { AxiosResponse } from "axios";
import { ChangePasswordProps, LoginFormInputs } from "../types/loginTypes";
import { User } from "../types/usersTypes";
import axiosInstance from "./axiosInstance";
import {
  PropertiesPostResponse,
  PropertiesResponse,
  PropertyResponse,
} from "../types/propertiesTypes";
import { BankDetails } from "../types/bankDetailsTypes";
import { SignUpRequest, SignUpResponse } from "../types/signupUserTypes";
import { UploadResponse } from "../types/uploadFileTypes";
import { GalleryResponse, GalleryTypesResponse } from "../types/galleryTypes";
import { AmenitiesResponse } from "../types/amenitiesTypes";
import { DashboardData } from "../types/dashboard";
import {
  AboutUsTypes,
  LegalContent,
  LegalContentResponse,
} from "../types/legalsTypes";
import { IMonthlyInvoice } from "../types/invoiceTypes";
import { MonthlyInvoiceRevenueResponse } from "../types/revenueTypes";
import {
  FurnishingFormData,
  FurnishingResponseInvoice,
} from "../types/furnishingTypes";
import {
  MaintenanceFormValues,
  MaintenanceResponseValues,
} from "../types/maintenanceTypes";

// Example: Login Method
export const login = async (data: LoginFormInputs): Promise<any> => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};

export const signUpUser = async (
  userData: SignUpRequest
): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>(
    "/admin/signup",
    userData
  );
  return response.data;
};

// Example: Fetch User Profile
export const fetchUserProfile = async (): Promise<any> => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

// Example: Update User Details
export const updateUserDetails = async (
  id: string,
  data: Record<string, any>
): Promise<any> => {
  const response = await axiosInstance.put(`/admin/users/${id}`, data);
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

export const fetchUsers = async (query: string): Promise<any> => {
  const response = await axiosInstance.get(`/admin/users?${query}`);
  return response;
};

// API service to fetch user details by ID
interface ApiResponseUserDetail<T> {
  statusCode: number;
  data: T;
  message: string;
}

export const fetchUserById = async (
  userId: string
): Promise<ApiResponse<User>> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    const response: AxiosResponse<ApiResponseUserDetail<User>> =
      await axiosInstance.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user details."
    );
  }
};

//** Soft Delete Api */
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

export const fetchProperties = async (query: string): Promise<any> => {
  const response = await axiosInstance.get(`/admin/properties?${query}`);
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

//** Bank details of user by id */

interface ApiResponseBankDetail<T> {
  statusCode: number;
  data: T;
  message: string;
}

export const fetchUserBankDetailsById = async (
  userId: string
): Promise<ApiResponse<BankDetails>> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    const response: AxiosResponse<ApiResponseBankDetail<BankDetails>> =
      await axiosInstance.get(`/admin/bank-details/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user details."
    );
  }
};

interface BankDetailsApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

export const upsertBankDetails = async (
  userId: string,
  data: Record<string, any>
): Promise<BankDetailsApiResponse<BankDetails>> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const response = await axiosInstance.put(
    `/admin/bank-details/${userId}`,
    data
  );
  return response.data; // Assuming the API response wraps data in a `data` field
};

//** Get Property By user Id */

export const fetchPropertiesByUser = async (
  userId: string | number | (string | number)[]
): Promise<PropertiesResponse> => {
  try {
    const response = await axiosInstance.get<PropertiesResponse>(
      `/admin/properties/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch properties"
    );
  }
};

export const uploadFile = async (
  folder: string = "properties",
  file: File
): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<UploadResponse>(
      `/users/upload/single?folder=${folder}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload file");
  }
};

export const fetchGallery = async (data: {
  img_url: string;
  type: string;
}): Promise<GalleryResponse> => {
  try {
    const response = await axiosInstance.post<GalleryResponse>(
      `/admin/gallery`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch gallery data"
    );
  }
};

export const deleteGalleryItem = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
    }>(`/admin/gallery/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete gallery item"
    );
  }
};

export const fetchGalleryTypes = async (): Promise<GalleryTypesResponse> => {
  try {
    const response = await axiosInstance.get<GalleryTypesResponse>(
      "/admin/gallery-types/"
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch gallery types"
    );
  }
};

//** Create property */

export const createProperty = async (
  payload: Omit<PropertyResponse, "_id" | "createdAt" | "updatedAt">
): Promise<PropertiesPostResponse<any>> => {
  try {
    const response = await axiosInstance.post<PropertiesPostResponse<any>>(
      "/admin/properties",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create property"
    );
  }
};

export const fetchAmenities = async (): Promise<AmenitiesResponse> => {
  try {
    const response = await axiosInstance.get(`/admin/amenities`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching amenities data");
  }
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await axiosInstance.get<DashboardData>(`/admin/dashboard`);
  return response.data;
};

export const fetchLegilesData = async (
  type = "policy"
): Promise<LegalContentResponse> => {
  const response = await axiosInstance.get<LegalContentResponse>(
    `/content?type=${type}`
  );
  return response.data;
};

type PaylodLegals = {
  title: string;
  body: string;
  type: string;
};

export const createLegalsApi = async (
  payload: PaylodLegals
): Promise<PropertiesPostResponse<any>> => {
  try {
    const response = await axiosInstance.post<PropertiesPostResponse<any>>(
      "/admin/content",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create property"
    );
  }
};

export const fetchAboutData = async (): Promise<AboutUsTypes> => {
  const response = await axiosInstance.get<AboutUsTypes>(`/ui-content`);
  return response.data;
};

interface AboutPaylod {
  title: string;
  body: string;
  images: string[];
}
export const createAboutsApi = async (payload: AboutPaylod): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(
      "/admin/ui-content",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create property"
    );
  }
};

export interface InvoicePayload {
  url: string;
  title: string;
  total_amount: number;
  received_amount: number;
  net_amount_to_pay: number;
  property: string;
}

export const createInvoice = async (
  payload: InvoicePayload
): Promise<PropertiesPostResponse<any>> => {
  try {
    const response = await axiosInstance.post<PropertiesPostResponse<any>>(
      "/admin/statements",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};

interface MonthlyPostResponse<T> {
  data: T;
  message: string;
}

export const createMonthlyInvoice = async (
  payload: IMonthlyInvoice
): Promise<MonthlyPostResponse<any>> => {
  try {
    const response = await axiosInstance.post<MonthlyPostResponse<any>>(
      "/admin/monthly-invoice",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};

/**
 * Fetch monthly invoice revenue data
 * @param propertyId - Property ID
 * @param targetMonth - Target month in YYYY-MM format
 * @param userId - User ID
 * @returns Promise<MonthlyInvoiceRevenueResponse>
 */
export const fetchMonthlyInvoiceRevenue = async (
  propertyId: string,
  targetMonth: string,
  userId: string
): Promise<MonthlyInvoiceRevenueResponse> => {
  const response = await axiosInstance.get<MonthlyInvoiceRevenueResponse>(
    `/admin/monthly-invoice-revenue?property_id=${propertyId}&target_month=${targetMonth}&user_id=${userId}`
  );
  return response.data;
};

export const fetchMonthlyInvoiceRevenueList = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(`/admin/monthly-invoice-list`);
  return response.data;
};

export const createFurnishingInvoice = async (
  payload: FurnishingFormData
): Promise<MonthlyPostResponse<any>> => {
  try {
    const response = await axiosInstance.post<MonthlyPostResponse<any>>(
      "/admin/furnishings",
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};

export const updateFurnishingInvoice = async (
  id: string,
  payload: FurnishingFormData
): Promise<MonthlyPostResponse<any>> => {
  try {
    const response = await axiosInstance.put<MonthlyPostResponse<any>>(
      `/admin/furnishings/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};

export const fetchFurnishingInvoiceList = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(`/admin/furnishings-list`);
  return response.data;
};

interface ApiResponseFurnishingDetails<T> {
  data: T;
}

export const fetchFurnishingDetailsById = async (
  id: string
): Promise<FurnishingResponseInvoice> => {
  if (!id) {
    throw new Error("Furnishing ID is required.");
  }

  try {
    const response: AxiosResponse<
      ApiResponseFurnishingDetails<FurnishingResponseInvoice>
    > = await axiosInstance.get(`/admin/furnishings/${id}`);

    return response.data.data; // Extract the furnishing details
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch furnishing details."
    );
  }
};

export interface UtilityData {
  _id?: string;
  vat_tax_rate: number;
  tourism_tax_rate: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface iResponseUtils {
  data: UtilityData;
}

export const fetchUtilityData = async (): Promise<iResponseUtils> => {
  const response = await axiosInstance.get<iResponseUtils>("/admin/utility"); // Adjust endpoint as per your actual route
  return response.data;
};

// useCreateMaintenance

export const createMaintenanceInvoice = async (
  payload: MaintenanceFormValues
) => {
  try {
    const response = await axiosInstance.post(
      "/admin/maintenance-invoice",
      payload
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};

export const fetchMaintenanceInvoiceList = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    `/admin/maintenance-invoice-list`
  );
  return response.data;
};

export const fetchMaintenanceInvoiceDetailsById = async (
  id: string
): Promise<MaintenanceResponseValues> => {
  if (!id) {
    throw new Error("Furnishing ID is required.");
  }

  try {
    const response: AxiosResponse<
      ApiResponseFurnishingDetails<MaintenanceResponseValues>
    > = await axiosInstance.get(`/admin/maintenance-invoice/${id}`);

    return response.data.data; // Extract the furnishing details
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch furnishing details."
    );
  }
};

export const updateMaintenanceInvoice = async (
  id: string,
  payload: MaintenanceFormValues
): Promise<MonthlyPostResponse<any>> => {
  try {
    const response = await axiosInstance.put<MonthlyPostResponse<any>>(
      `/admin/maintenance-invoice/${id}`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create invoice"
    );
  }
};
