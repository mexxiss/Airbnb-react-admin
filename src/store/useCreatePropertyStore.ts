import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PermitDetails {
  permit_code: string;
  permit_expiry_date: string;
}

interface WiFiDetails {
  name: string;
  password: string;
}

interface Costs {
  prices: {
    security_amount: number;
    price_per_night: number;
    cleaning_fee: number;
  };
  currency: string;
  security_details: string;
  revenue_details: {
    future_occupancy: string;
    total_revenue: number;
  };
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

interface PropertyDetails {
  permit: PermitDetails;
  wifi: WiFiDetails;
  bhk: string;
  max_guest_count: number;
  rooms_count: number;
  beds_count: number;
  bathrooms_count: number;
  furnishing: string;
  utilities: string[];
  parking_no: string;
}

interface Discounts {
  weekly: number;
  monthly: number;
}

interface PropertyCheckDetails {
  check_in: string;
  check_out: string;
}

interface ImportantInformation {
  about_space: string;
  guest_access: string;
  getting_around: string;
  other: string;
}

interface CreatePropertyState {
  property_details: PropertyDetails;
  address: Address;
  discounts_percentage: Discounts;
  property_check_details: PropertyCheckDetails;
  important_information: ImportantInformation;
  property_types: string;
  title: string;
  description: string;
  property_images: string[];
  costs: Costs;
  staying_rules: string[];
  cancellation_policy: string;
  amenities: string[];
  user: string;
  status: string;

  // Actions
  setPropertyDetails: (details: Partial<PropertyDetails>) => void;
  setAddress: (address: Partial<Address>) => void;
  setCosts: (costs: Partial<Costs>) => void;
  resetPropertyState: () => void;
}

const useCreatePropertyStore = create<CreatePropertyState>()(
  persist(
    (set) => ({
      property_details: {
        permit: { permit_code: "", permit_expiry_date: "" },
        wifi: { name: "", password: "" },
        bhk: "",
        max_guest_count: 0,
        rooms_count: 0,
        beds_count: 0,
        bathrooms_count: 0,
        furnishing: "",
        utilities: [],
        parking_no: "",
      },
      address: {
        building_no: "",
        city: "",
        street: "",
        area: "",
        landmark: "",
        pincode: "",
        country: "",
      },
      discounts_percentage: { weekly: 0, monthly: 0 },
      property_check_details: { check_in: "", check_out: "" },
      important_information: {
        about_space: "",
        guest_access: "",
        getting_around: "",
        other: "",
      },
      property_types: "",
      title: "",
      description: "",
      property_images: [],
      costs: {
        prices: {
          security_amount: 0,
          price_per_night: 0,
          cleaning_fee: 0,
        },
        currency: "",
        security_details: "",
        revenue_details: {
          future_occupancy: "",
          total_revenue: 0,
        },
      },
      staying_rules: [],
      cancellation_policy: "",
      amenities: [],
      user: "",
      status: "",

      // Actions
      setPropertyDetails: (details) =>
        set((state) => ({
          property_details: { ...state.property_details, ...details },
        })),
      setAddress: (address) =>
        set((state) => ({ address: { ...state.address, ...address } })),
      setCosts: (costs) =>
        set((state) => ({ costs: { ...state.costs, ...costs } })),
      resetPropertyState: () =>
        set(() => ({
          property_details: {
            permit: { permit_code: "", permit_expiry_date: "" },
            wifi: { name: "", password: "" },
            bhk: "",
            max_guest_count: 0,
            rooms_count: 0,
            beds_count: 0,
            bathrooms_count: 0,
            furnishing: "",
            utilities: [],
            parking_no: "",
          },
          address: {
            building_no: "",
            city: "",
            street: "",
            area: "",
            landmark: "",
            pincode: "",
            country: "",
          },
          discounts_percentage: { weekly: 0, monthly: 0 },
          property_check_details: { check_in: "", check_out: "" },
          important_information: {
            about_space: "",
            guest_access: "",
            getting_around: "",
            other: "",
          },
          property_types: "",
          title: "",
          description: "",
          property_images: [],
          costs: {
            prices: {
              security_amount: 0,
              price_per_night: 0,
              cleaning_fee: 0,
            },
            currency: "",
            security_details: "",
            revenue_details: {
              future_occupancy: "",
              total_revenue: 0,
            },
          },
          staying_rules: [],
          cancellation_policy: "",
          amenities: [],
          user: "",
          status: "",
        })),
    }),
    {
      name: "create-property-storage", // Name for localStorage key
      partialize: (state) => ({ ...state }), // Persist entire state
    }
  )
);

export default useCreatePropertyStore;
