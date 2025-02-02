interface PropertyDetails {
  permit: {
    permit_code: string;
    permit_expiry_date: string; // ISO 8601 date format
  };
  isWifiAvailable?: boolean;
  wifi?: {
    name: string;
    password: string;
  };
  max_guest_count: number;
  bhk?: string;
  rooms_count: number;
  beds_count: number;
  bathrooms_count: number;
  furnishing: string;
  utilities?: string[]; // Array of utilities (can be empty)
  parking_no: string;
}

interface Address {
  building_no: string;
  city: string;
  street: string;
  area: string;
  landmark: string;
  pincode: string;
  country: string;
}

interface DiscountsPercentage {
  weekly: number;
  monthly: number;
}

interface PropertyCheckDetails {
  check_in: string; // Time format (HH:mm)
  check_out: string; // Time format (HH:mm)
}

interface Costs {
  prices: {
    security_amount: number;
    price_per_night: number;
    cleaning_fee: number;
  };
  currency: string | "AED" | "USD" | "INR";
  security_details: string;
  revenue_details: {
    future_occupancy: string;
    total_revenue: number;
  };
  _id?: string;
}

export interface PropertyResponse {
  property_details: PropertyDetails;
  location?: Location;
  address: Address;
  discounts_percentage: DiscountsPercentage;
  property_check_details: PropertyCheckDetails;
  important_information: string;
  status: string;
  _id: string;
  title: string;
  description: string;
  property_images?: string[] | any; // Array of image IDs
  costs: Costs;
  staying_rules: string; // Array of staying rules
  cancellation_policy: string;

  amenities?: Amenity[] | string[];
  createdAt?: string;
  updatedAt: string;
  __v?: number;
  user: string; // User ID who owns the property
}

export interface ApiResponseProperties {
  data: PropertyResponse[];
  currentPage: number;
  totalPages: number;
  totalProperties: number;
}

export interface PropertiesResponse {
  properties: PropertyResponse[];
  totalCount: number;
}
interface Location {
  longitude?: string;
  latitude?: string;
}

interface Amenity {
  _id?: string;
  title?: string;
  icon?: string;
}
export interface PropertiesPostResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface SinglePropertyResponse {
  data: PropertyResponse;
  message: string;
}
