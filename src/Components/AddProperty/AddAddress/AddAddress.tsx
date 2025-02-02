import { useNavigate, useParams } from "react-router-dom";
import useCreatePropertyStoreNew from "../../../store/useCreatePropertyStoreNew";
import { Form, FormikProvider, useFormik } from "formik";
import { validationAddressSchema } from "../../../utils/validations/reArrengeSchemaValidation";
import Input from "../../Input/Input";
import { useCreateProperty } from "../../../hooks/react-query/properties-query/usePostProperty";
import SelectInput from "../../SelectInput/SelectInput";
import { citesArr } from "../PropertyDetails/utils/common";

const AddAddress = ({ setCurrentStep }: any) => {
  const { id } = useParams();
  const { handleChange, address, resetPropertyState } =
    useCreatePropertyStoreNew();
  const navigate = useNavigate();

  const { mutate: createProperty, isPending } = useCreateProperty();

  const formik = useFormik({
    initialValues: {
      address: { ...address, country: "United Arab Emirates" },
    },
    validationSchema: validationAddressSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newObject = { ...values, user: id };

      try {
        Object.entries(newObject).forEach(([key, value]) => {
          handleChange(key as keyof typeof values, value);
        });

        await new Promise((resolve) => setTimeout(resolve, 0));

        const {
          amenities,
          cancellation_policy,
          costs,
          description,
          discounts_percentage,
          important_information,
          property_check_details,
          property_details,
          property_images,
          property_images_urls,
          property_types,
          staying_rules,
          title,
          status,
          user,
        } = useCreatePropertyStoreNew.getState(); // Ensure latest Zustand state

        if (!title || !description || !address || !user) {
          alert(
            "Missing required fields: title, description, address, or user."
          );
          return;
        }

        const propertyData = {
          amenities,
          cancellation_policy,
          costs,
          description,
          discounts_percentage,
          important_information,
          property_check_details,
          property_details,
          property_images,
          property_images_urls,
          property_types,
          staying_rules,
          title,
          status,
          user,
          address: values.address,
        };

        createProperty(
          { propertyData },
          {
            onSuccess: (data) => {
              navigate(`/admin/property-details/${data.data._id}`);
              resetPropertyState();
            },
          }
        );
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
          <div className="pb-16 lg:pb-0 grid grid-cols-1 gap-4">
            <div className="">
              <Input
                name="address.building_no"
                type="text"
                label="Building Number "
                placeholder="Building Number "
                value={formik.values.address.building_no}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.building_no", value)
                }
              />
              {formik.touched?.address?.building_no &&
              formik.errors?.address?.building_no ? (
                <div className="text-red-600">
                  {formik?.errors.address?.building_no}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                name="address.area"
                type="text"
                label="Area "
                placeholder="Area "
                value={formik.values.address.area}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.area", value)
                }
              />
              {formik.touched?.address?.area && formik.errors?.address?.area ? (
                <div className="text-red-600">
                  {formik?.errors.address?.area}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                name="address.landmark"
                type="text"
                label="Landmark"
                placeholder="Landmark"
                value={formik.values.address.landmark}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.landmark", value)
                }
              />
              {formik.touched?.address?.landmark &&
              formik.errors?.address?.landmark ? (
                <div className="text-red-600">
                  {formik?.errors.address?.landmark}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                name="address.street"
                type="text"
                label="Street"
                placeholder="Street"
                value={formik.values.address.street}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.street", value)
                }
              />
              {formik.touched?.address?.street &&
              formik.errors?.address?.street ? (
                <div className="text-red-600">
                  {formik?.errors.address?.street}
                </div>
              ) : null}
            </div>
            <div className="">
              <SelectInput
                label="Select City"
                name="address.city"
                options={citesArr}
                placeholder="Choose an option"
                className="mb-4"
              />
            </div>
            {/* <div className="">
              <Input
                name="address.city"
                type="text"
                label="City"
                placeholder="City"
                value={formik.values.address.city}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.city", value)
                }
              />
              {formik.touched?.address?.city && formik.errors?.address?.city ? (
                <div className="text-red-600">
                  {formik?.errors.address?.city}
                </div>
              ) : null}
            </div> */}
            <div className="">
              <Input
                name="address.pincode"
                type="text"
                label="Pincode"
                placeholder="Pincode"
                value={formik.values.address.pincode}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.pincode", value)
                }
              />
              {formik.touched?.address?.pincode &&
              formik.errors?.address?.pincode ? (
                <div className="text-red-600">
                  {formik?.errors.address?.pincode}
                </div>
              ) : null}
            </div>
            <div className="">
              <Input
                disabled
                name="address.country"
                type="text"
                label="Country"
                placeholder="Country"
                value={formik.values.address.country}
                onChangeValue={(value) =>
                  formik.setFieldValue("address.country", value)
                }
              />
              {formik.touched?.address?.country &&
              formik.errors?.address?.country ? (
                <div className="text-red-600">
                  {formik?.errors.address?.country}
                </div>
              ) : null}
            </div>
          </div>
          <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 lg:mt-12 lg:mb-5 ">
            <button
              type="submit"
              // to="/user-panel/dashboard"
              className=" text-white bg-primary font-medium text-lg lg:text-xl py-2 lg:py-3 rounded-md lg:rounded-xl px-10 lg:min-w-80 w-full lg:w-auto"
            >
              {isPending ? "Comppleting..." : "Complete"}
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default AddAddress;
