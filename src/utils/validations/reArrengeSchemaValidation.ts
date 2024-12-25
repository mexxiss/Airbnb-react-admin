import * as Yup from "yup";

export const validationPropertyDetailSchema = Yup.object({
  property_details: Yup.object({
    permit: Yup.object({
      permit_code: Yup.string().required("Permit code is required"),
      permit_expiry_date: Yup.date().required("Permit expiry date is required"),
    }),
    bhk: Yup.string().required("BHK is required"),
    max_guest_count: Yup.number()
      .min(1, "Guest count must be greater than or equal to 1")
      .required("Max guest count is required")
      .label("max_guest_count"),
    rooms_count: Yup.number()
      .min(1, "Rooms counts must be greater than or equal to 1")
      .required("rooms counts is required")
      .label("rooms_count"),
    beds_count: Yup.number()
      .min(1, "Beds count must be greater than or equal to 1")
      .required("Beds count is required")
      .label("beds_count"),
    bathrooms_count: Yup.number()
      .min(1, "Bathrooms count must be greater than or equal to 1")
      .required("bathrooms count is required")
      .label("bathrooms_count"),
    furnishing: Yup.string().required("Furnishing is required"),
    parking_no: Yup.string().required("Parking number is required"),
  }),
  discounts_percentage: Yup.object({
    weekly: Yup.number().min(0).required("Weekly discount is required"),
    monthly: Yup.number().min(0).required("Monthly discount is required"),
  }),
  property_check_details: Yup.object({
    check_in: Yup.string().required("Check-in time is required"),
    check_out: Yup.string().required("Check-out time is required"),
  }),
  important_information: Yup.string().required(
    "Important Information is required"
  ),
  property_images: Yup.array().of(
    Yup.string().required("Image ID is required")
  ),
  costs: Yup.object({
    prices: Yup.object({
      security_amount: Yup.number()
        .min(0)
        .required("Security amount is required"),
      price_per_night: Yup.number()
        .min(1, "Price per night must be greater than or equal to 1")
        .required("Price per night is required")
        .label("price_per_night"),
      cleaning_fee: Yup.number().min(0).required("Cleaning fee is required"),
    }),
    currency: Yup.string().required("Currency is required"),
    security_details: Yup.string().required("Security details are required"),
  }),
  staying_rules: Yup.string()
    .required("Staying rule is required")
    .label("staying_rules"),
  property_types: Yup.string().required("Property type is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  cancellation_policy: Yup.string().required("Cancellation policy is required"),
  //   user: Yup.string().required("User ID is required"),
  status: Yup.string().required("Status is required"),
});

export const validationAmenitiesDetailSchema = Yup.object({
  amenities: Yup.array()
    .of(Yup.string().required("Amenity ID is required"))
    .min(1, "At least one amenity must be selected"),
});
export const validationAddressSchema = Yup.object({
  address: Yup.object({
    building_no: Yup.string().required("Building number is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    area: Yup.string().required("Area is required"),
    landmark: Yup.string(),
    pincode: Yup.string().required("Pincode is required"),
    country: Yup.string().required("Country is required"),
  }),
});
