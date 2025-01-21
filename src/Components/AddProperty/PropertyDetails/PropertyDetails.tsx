import React from "react";
import useCreatePropertyStoreNew from "../../../store/useCreatePropertyStoreNew";
import { Form, FormikProvider, useFormik } from "formik";
import { validationPropertyDetailSchema } from "../../../utils/validations/reArrengeSchemaValidation";
import Input from "../../Input/Input";
import RadioInput from "../../RadioInput/RadioInput";
import TimeInput from "../../TimeInput/TimeInput";
import ReactQuillInput from "../../ReactQuillInput/ReactQuillInput";
import DateInput from "../../DateInput/DateInput";
import SelectInput from "../../SelectInput/SelectInput";
import {
  bhkOptions,
  furnishTypeOptions,
  options,
  optionsCurrency,
  propertyOptions,
} from "./utils/common";

const PropertyDetails = ({ setCurrentStep }: any) => {
  const {
    handleChange,
    property_details,
    discounts_percentage,
    costs,
    title,
    property_types,
    property_check_details,
    description,
    staying_rules,
    cancellation_policy,
    important_information,
    user,
    status,
  } = useCreatePropertyStoreNew();

  const formik = useFormik({
    initialValues: {
      property_details: property_details || {},
      discounts_percentage: discounts_percentage || {},
      property_check_details: property_check_details || {},
      property_types: property_types || "",
      title: title || "",
      description: description || "",
      costs: costs || {},
      staying_rules: staying_rules || "",
      cancellation_policy: cancellation_policy || "",
      user: user || "",
      status: status || "",
      important_information: important_information || "",
    },
    validationSchema: validationPropertyDetailSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        Object.entries(values).forEach(([key, value]) => {
          handleChange(key as keyof typeof values, value);
        });
        setCurrentStep(2);
        console.log({ values });
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Title"
                value={formik.values.title}
                onChangeValue={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-600">{formik.errors.title}</div>
              ) : null}
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Description"
                name="description"
                type="textarea"
                placeholder="Description"
                value={formik.values.description}
                onChangeValue={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-600">{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="sm:col-span-2">
              <RadioInput
                name="property_types"
                label="Property Type"
                options={propertyOptions}
                value={formik.values.property_types}
                containerClass="mt-4"
                listClass="mt-2"
                optionLabelClass="hover:border-blue-500 hover:text-blue-500" // Add hover effect
                onChange={(value) =>
                  formik.handleChange({
                    target: { name: "property_types", value },
                  })
                }
                error={
                  formik.touched.property_types && formik.errors.property_types
                    ? formik.errors.property_types
                    : undefined
                }
              />
            </div>
            <div className="sm:col-span-2">
              <RadioInput
                name="property_details.bhk"
                label="BHK"
                options={bhkOptions}
                value={formik.values.property_details.bhk}
                onChange={(value) =>
                  formik.setFieldValue("property_details.bhk", value)
                }
                error={
                  formik.touched.property_details?.bhk &&
                  formik.errors.property_details?.bhk
                    ? formik.errors.property_details.bhk
                    : ""
                }
                containerClass="mt-4"
                listClass="mt-2"
                optionLabelClass="hover:border-blue-500 hover:text-blue-500"
              />
            </div>
            <div className="">
              <Input
                name="property_details.rooms_count"
                type="number"
                label="Rooms"
                placeholder="Rooms"
                value={formik.values.property_details.rooms_count}
                onChangeValue={(value) =>
                  formik.setFieldValue("property_details.rooms_count", value)
                }
              />
              {formik.touched.property_details?.rooms_count &&
              formik.errors.property_details?.rooms_count ? (
                <div className="text-red-600">
                  {formik.errors.property_details?.rooms_count}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                name="property_details.beds_count"
                type="number"
                label="Beds Count"
                placeholder="Beds Count"
                value={formik.values.property_details.beds_count}
                onChangeValue={(value) =>
                  formik.setFieldValue("property_details.beds_count", value)
                }
              />
              {formik.touched.property_details?.beds_count &&
              formik.errors.property_details?.beds_count ? (
                <div className="text-red-600">
                  {formik.errors.property_details?.beds_count}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                name="property_details.bathrooms_count"
                type="number"
                label="Bathrooms Count"
                placeholder="Bathrooms Count"
                value={formik.values.property_details.bathrooms_count}
                onChangeValue={(value) =>
                  formik.setFieldValue(
                    "property_details.bathrooms_count",
                    value
                  )
                }
              />
              {formik.touched.property_details?.bathrooms_count &&
              formik.errors.property_details?.bathrooms_count ? (
                <div className="text-red-600">
                  {formik.errors.property_details?.bathrooms_count}
                </div>
              ) : null}
            </div>

            <div className="">
              <Input
                name="property_details.max_guest_count"
                type="number"
                label="Guests"
                placeholder="No. of Guests"
                value={formik.values.property_details.max_guest_count}
                onChangeValue={(value) =>
                  formik.setFieldValue(
                    "property_details.max_guest_count",
                    value
                  )
                }
              />
              {formik.touched.property_details?.max_guest_count &&
              formik.errors.property_details?.max_guest_count ? (
                <div className="text-red-600">
                  {formik.errors.property_details?.max_guest_count}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-2 my-3">
              <p className="text-lg font-medium  text-primary">Price Details</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div className="">
                  <Input
                    name="discounts_percentage.weekly"
                    type="number"
                    label="Weekly Discount %"
                    placeholder="Weekly Discount %"
                    value={formik.values.discounts_percentage.weekly}
                    onChangeValue={(value) =>
                      formik.setFieldValue("discounts_percentage.weekly", value)
                    }
                  />
                  {formik.touched.discounts_percentage?.weekly &&
                  formik.errors.discounts_percentage?.weekly ? (
                    <div className="text-red-600">
                      {formik.errors.discounts_percentage?.weekly}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <Input
                    name="discounts_percentage.monthly"
                    type="number"
                    label="Monthly Discount %"
                    placeholder="Monthly Discount %"
                    value={formik.values.discounts_percentage.monthly}
                    onChangeValue={(value) =>
                      formik.setFieldValue(
                        "discounts_percentage.monthly",
                        value
                      )
                    }
                  />
                  {formik.touched.discounts_percentage?.monthly &&
                  formik.errors.discounts_percentage?.monthly ? (
                    <div className="text-red-600">
                      {formik.errors.discounts_percentage?.monthly}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Input
                    name="costs.prices.price_per_night"
                    type="text"
                    label="Price Per Night"
                    placeholder="Price Per Night"
                    value={formik.values.costs.prices.price_per_night}
                    onChangeValue={(value) =>
                      formik.setFieldValue("costs.price.price_per_night", value)
                    }
                  />
                  {formik.touched.costs?.prices?.price_per_night &&
                  formik.errors.costs?.prices?.price_per_night ? (
                    <div className="text-red-600">
                      {formik.errors.costs?.prices?.price_per_night}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Input
                    name="costs.prices.security_amount"
                    type="number"
                    label="Security Amount"
                    placeholder="Security Amount"
                    value={formik.values.costs.prices.security_amount}
                    onChangeValue={(value) =>
                      formik.setFieldValue("costs.price.security_amount", value)
                    }
                  />
                  {formik.touched.costs?.prices?.security_amount &&
                  formik.errors.costs?.prices?.security_amount ? (
                    <div className="text-red-600">
                      {formik.errors.costs?.prices?.security_amount}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Input
                    name="costs.prices.cleaning_fee"
                    type="number"
                    label="Cleaning Fee"
                    placeholder="Cleaning Fee"
                    value={formik.values.costs.prices.cleaning_fee}
                    onChangeValue={(value) =>
                      formik.setFieldValue("costs.price.cleaning_fee", value)
                    }
                  />
                  {formik.touched.costs?.prices?.cleaning_fee &&
                  formik.errors.costs?.prices?.cleaning_fee ? (
                    <div className="text-red-600">
                      {formik.errors.costs?.prices?.cleaning_fee}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Input
                    name="property_details.parking_no"
                    type="text"
                    label="Parking No"
                    placeholder="Parking No"
                    value={formik.values.property_details.parking_no}
                    onChangeValue={(value) =>
                      formik.setFieldValue("property_details.parking_no", value)
                    }
                  />
                  {formik.touched?.property_details?.parking_no &&
                  formik.errors?.property_details?.parking_no ? (
                    <div className="text-red-600">
                      {formik.errors?.property_details?.parking_no}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <SelectInput
                    label="Property Status Select"
                    name="status"
                    options={options}
                    placeholder="Choose an option"
                    className="mb-4"
                  />
                </div>

                <div className="">
                  <SelectInput
                    label="Currency Select"
                    name="costs.currency"
                    options={optionsCurrency}
                    placeholder="Choose an option"
                    className="mb-4"
                  />
                </div>

                <div className="">
                  <Input
                    name="costs.security_details"
                    type="text"
                    label="Security Details"
                    placeholder="Security Details"
                    value={formik.values.costs.security_details}
                    onChangeValue={(value) =>
                      formik.setFieldValue("costs.security_details", value)
                    }
                  />
                  {formik.touched?.costs?.security_details &&
                  formik.errors.costs?.security_details ? (
                    <div className="text-red-600">
                      {formik.errors.costs?.security_details}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="">
              <TimeInput
                name="property_check_details.check_in"
                label="Check-In Time"
                value={formik.values.property_check_details.check_in}
                onChange={(value) =>
                  formik.setFieldValue("property_check_details.check_in", value)
                }
                min="09:00"
                max="18:00"
              />
              {formik.touched?.property_check_details?.check_in &&
              formik.errors?.property_check_details?.check_in ? (
                <div className="text-red-600">
                  {formik.errors?.property_check_details?.check_in}
                </div>
              ) : null}
            </div>

            <div className="">
              <TimeInput
                name="property_check_details.check_out"
                label="Check-Out Time"
                value={formik.values.property_check_details.check_out}
                onChange={(value) =>
                  formik.setFieldValue(
                    "property_check_details.check_out",
                    value
                  )
                }
                min="09:00"
                max="18:00"
              />
              {formik.touched?.property_check_details?.check_out &&
              formik.errors?.property_check_details?.check_out ? (
                <div className="text-red-600">
                  {formik.errors?.property_check_details?.check_out}
                </div>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <RadioInput
                name="property_details.furnishing"
                label="Furnish Type"
                options={furnishTypeOptions}
                value={formik.values.property_details.furnishing}
                containerClass="mt-4"
                listClass="mt-2"
                optionLabelClass="hover:border-blue-500 hover:text-blue-500" // Add hover effect
                onChange={(value) =>
                  formik.handleChange({
                    target: { name: "property_details.furnishing", value },
                  })
                }
                error={
                  formik.touched?.property_details?.furnishing
                    ? formik.errors?.property_details?.furnishing
                    : undefined
                }
              />
            </div>

            <div className="sm:col-span-2">
              <ReactQuillInput
                name="staying_rules"
                label="Staying Rules"
                placeholder="Write your staying rules..."
              />
            </div>

            <div className="sm:col-span-2">
              <ReactQuillInput
                name="important_information"
                label="Important information"
                placeholder="Write your important information..."
              />
            </div>

            <div className="sm:col-span-2">
              <ReactQuillInput
                name="cancellation_policy"
                label="Cancellation Policy"
                placeholder="Write your cancellation policy..."
              />
            </div>

            <div className="">
              <Input
                name="property_details.permit.permit_code"
                type="text"
                label="Permit Code"
                placeholder="Permit Code"
                value={formik.values.property_details?.permit?.permit_code}
                onChangeValue={(value) =>
                  formik.setFieldValue(
                    "property_details.permit.permit_code",
                    value
                  )
                }
              />
              {formik.touched?.property_details?.permit?.permit_code &&
              formik.errors?.property_details?.permit?.permit_code ? (
                <div className="text-red-600">
                  {formik.errors?.property_details?.permit?.permit_code}
                </div>
              ) : null}
            </div>
            <div className="">
              <DateInput
                label="Permit Expiry Date"
                name="property_details.permit.permit_expiry_date"
                placeholder="Select permit expiry date"
                minDate="2023-12-01"
                maxDate="2030-12-31"
                className="mb-4"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="btn1 !rounded !px-10"
              // disabled={!(formik?.isValid && formik?.dirty)}
            >
              Next
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default PropertyDetails;
