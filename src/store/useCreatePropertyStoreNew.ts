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
  //   wifi: WiFiDetails;
  bhk: string;
  max_guest_count: number;
  rooms_count: number;
  beds_count: number;
  bathrooms_count: number;
  furnishing: string;
  utilities: string[];
  parking_no: string;
}

// interface FileDetails {
//   name: string;
//   lastModified: number;
//   lastModifiedDate: Date | string; // Adjust to `Date` if parsing is consistent
//   webkitRelativePath: string;
//   size: number;
// }

interface SelectedOption {
  value: string;
  label: string;
}

export interface ItemDetails {
  id: string;
  name: string;
  preview: string;
  selectedOption: SelectedOption;
  file: File | null;
  _id?: string;
}

interface Discounts {
  weekly: number;
  monthly: number;
}

interface PropertyCheckDetails {
  check_in: string;
  check_out: string;
}

interface CreatePropertyState {
  property_details: PropertyDetails;
  address: Address;
  discounts_percentage: Discounts;
  property_check_details: PropertyCheckDetails;
  important_information: string;
  property_types: string;
  title: string;
  description: string;
  property_images: string[];
  property_images_urls: ItemDetails[];
  costs: Costs;
  staying_rules: string;
  cancellation_policy: string;
  amenities: string[];
  user: string;
  status: string;
  // Actions
  handleChange: (key: keyof CreatePropertyState, value: any) => void;
  resetPropertyState: () => void;
  resetAmeitiesState: () => void;
}

const initialState: Omit<
  CreatePropertyState,
  "handleChange" | "resetPropertyState" | "resetAmeitiesState"
> = {
  property_details: {
    permit: { permit_code: "", permit_expiry_date: "" },
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
  important_information: "",
  property_types: "",
  title: "",
  description: "",
  property_images: [],
  property_images_urls: [],
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
  staying_rules: "",
  cancellation_policy: "",
  amenities: [],
  user: "",
  status: "",
};

const useCreatePropertyStoreNew = create<CreatePropertyState>()(
  persist(
    (set) => ({
      ...initialState,
      handleChange: (key, value) =>
        set((state) => ({ ...state, [key]: value })),
      resetPropertyState: () => set(() => ({ ...initialState })),
      resetAmeitiesState: () => set(() => ({ amenities: [] })),
    }),
    {
      name: "create-property-storage",
      partialize: (state) => ({ ...state }),
    }
  )
);

export default useCreatePropertyStoreNew;
