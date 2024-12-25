import React from "react";
import useCreatePropertyStoreNew from "../../../store/useCreatePropertyStoreNew";
import { Form, FormikProvider, useFormik } from "formik";
import { validationAmenitiesDetailSchema } from "../../../utils/validations/reArrengeSchemaValidation";
import { CheckboxHiddenInput } from "../../Checkbox/CheckboxHiddenInput";
import "./Amenities.css";
import { useFetchAmenities } from "../../../hooks/react-query/amenities";
import Loader from "../../Loader/Loader";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";

const Amenities = ({ setCurrentStep }: any) => {
  const { handleChange, amenities } = useCreatePropertyStoreNew();
  const { data, isLoading, error, isError } = useFetchAmenities();

  const formik = useFormik({
    initialValues: {
      amenities: amenities || [],
    },
    validationSchema: validationAmenitiesDetailSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log({ values });

        Object.entries(values).forEach(([key, value]) => {
          handleChange(key as keyof typeof values, value);
        });
        setCurrentStep(3);
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="pb-16 lg:pb-0 ">
            <div className="mb-[30px]">
              <ul className="flex flex-wrap gap-3.5 mt-2">
                {data.data?.map((amenity: any) => (
                  <CheckboxHiddenInput
                    key={amenity._id}
                    name="amenities" // This can be the name of the form field where selected amenities will be stored
                    label={amenity.title} // Use the title as the label
                    value={amenity._id} // Pass the _id as the value
                    icon={amenity?.icon} // Icon URL
                  />
                ))}
              </ul>
              {formik.errors?.amenities && (
                <div className="text-red-500">{formik.errors.amenities}</div>
              )}
            </div>
          </div>
          <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 ">
            <button type="submit" className="btn1 !rounded !px-10">
              Next
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default Amenities;
