import * as Yup from "yup";

export const initialPropertyValues = {
  property_details: {
    permit: {
      permit_code: "",
      permit_expiry_date: "",
    },
    wifi: {
      name: "",
      password: "",
    },
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
  discounts_percentage: {
    weekly: 0,
    monthly: 0,
  },
  property_check_details: {
    check_in: "",
    check_out: "",
  },
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
};

export const validationPropertySchema = Yup.object({
  property_details: Yup.object({
    permit: Yup.object({
      permit_code: Yup.string().required("Permit code is required"),
      permit_expiry_date: Yup.date().required("Permit expiry date is required"),
    }),
    wifi: Yup.object({
      name: Yup.string().required("WiFi name is required"),
      password: Yup.string().required("WiFi password is required"),
    }),
    bhk: Yup.string().required("BHK is required"),
    max_guest_count: Yup.number()
      .min(1)
      .required("Max guest count is required"),
    rooms_count: Yup.number().min(1).required("Rooms count is required"),
    beds_count: Yup.number().min(1).required("Beds count is required"),
    bathrooms_count: Yup.number()
      .min(1)
      .required("Bathrooms count is required"),
    furnishing: Yup.string().required("Furnishing is required"),
    utilities: Yup.array().of(Yup.string()),
    parking_no: Yup.string().required("Parking number is required"),
  }),
  address: Yup.object({
    building_no: Yup.string().required("Building number is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    area: Yup.string().required("Area is required"),
    landmark: Yup.string(),
    pincode: Yup.string().required("Pincode is required"),
    country: Yup.string().required("Country is required"),
  }),
  discounts_percentage: Yup.object({
    weekly: Yup.number().min(0).required("Weekly discount is required"),
    monthly: Yup.number().min(0).required("Monthly discount is required"),
  }),
  property_check_details: Yup.object({
    check_in: Yup.string().required("Check-in time is required"),
    check_out: Yup.string().required("Check-out time is required"),
  }),
  important_information: Yup.object({
    about_space: Yup.string().required("Information about space is required"),
    guest_access: Yup.string().required("Guest access is required"),
    getting_around: Yup.string().required(
      "Getting around information is required"
    ),
    other: Yup.string().required("Other important information is required"),
  }),
  property_types: Yup.string().required("Property type is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  property_images: Yup.array().of(
    Yup.string().required("Image ID is required")
  ),
  costs: Yup.object({
    prices: Yup.object({
      security_amount: Yup.number()
        .min(0)
        .required("Security amount is required"),
      price_per_night: Yup.number()
        .min(1)
        .required("Price per night is required"),
      cleaning_fee: Yup.number().min(0).required("Cleaning fee is required"),
    }),
    currency: Yup.string().required("Currency is required"),
    security_details: Yup.string().required("Security details are required"),
    revenue_details: Yup.object({
      future_occupancy: Yup.string().required("Future occupancy is required"),
      total_revenue: Yup.number().min(0),
    }),
  }),
  staying_rules: Yup.array().of(
    Yup.string().required("Staying rule is required")
  ),
  cancellation_policy: Yup.string().required("Cancellation policy is required"),
  amenities: Yup.array().of(Yup.string().required("Amenity ID is required")),
  user: Yup.string().required("User ID is required"),
  status: Yup.string().required("Status is required"),
});
