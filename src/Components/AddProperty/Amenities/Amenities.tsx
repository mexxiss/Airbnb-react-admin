import React from "react";
import breakfast from "../../../assets/icons/breakfast.png";
import wheelchair from "../../../assets/icons/wheelchair.png";
import smoking from "../../../assets/icons/smoking.png";
import elevator from "../../../assets/icons/elevator.png";
import kidFriendly from "../../../assets/icons/kidFriendly.png";
import parking from "../../../assets/icons/parking.png";
import pet from "../../../assets/icons/pet.png";
import pool from "../../../assets/icons/pool.png";
import multiFamlily from "../../../assets/icons/multiFamlily.png";
import restaurant from "../../../assets/icons/restaurant.png";
import "./Amenities.css";
import useCreatePropertyStoreNew from "../../../store/useCreatePropertyStoreNew";
import { Form, FormikProvider, useFormik } from "formik";
import { validationAmenitiesDetailSchema } from "../../../utils/validations/reArrengeSchemaValidation";
import { CheckboxHiddenInput } from "../../Checkbox/CheckboxHiddenInput";

const Amenities = ({ setCurrentStep }: any) => {
  const { handleChange, amenities } = useCreatePropertyStoreNew();
  const options = [
    {
      id: "Restaurant",
      name: "Restaurant",
      label: "Restaurant",
      icon: restaurant,
    },
    { id: "Pool", name: "Pool", label: "Pool", icon: pool },
    {
      id: "Smoking",
      name: "Smoking",
      label: "Smoking not allowed",
      icon: smoking,
    },
    {
      id: "Wheelchair",
      name: "Wheelchair",
      label: "Wheelchair Accessible",
      icon: wheelchair,
    },
    {
      id: "Elevator",
      name: "Elevator",
      label: "Elevator in building",
      icon: elevator,
    },
    {
      id: "Breakfast",
      name: "Breakfast",
      label: "Breakfast Included",
      icon: breakfast,
    },
    { id: "Parking", name: "parking", label: "Free parking", icon: parking },
    {
      id: "Multifamily",
      name: "Multi_family",
      label: "Multi family",
      icon: multiFamlily,
    },
    { id: "Kids", name: "Kids", label: "Kids Friendly", icon: kidFriendly },
    { id: "Pet", name: "Pet", label: "Pet Allowed", icon: pet },
  ];

  const formik = useFormik({
    initialValues: {
      amenities: amenities || [],
    },
    validationSchema: validationAmenitiesDetailSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        Object.entries(values).forEach(([key, value]) => {
          handleChange(key as keyof typeof values, value);
        });
        setCurrentStep(3);
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
          <div className="pb-16 lg:pb-0 ">
            <div className="mb-[30px]">
              <ul className="flex flex-wrap gap-3.5 mt-2">
                {options.map((option) => (
                  <CheckboxHiddenInput
                    key={option.id}
                    name="amenities"
                    value={option.id}
                    label={option.label}
                    icon={option.icon}
                    containerClass="min-w-24"
                  />
                ))}
              </ul>
              {formik.errors?.amenities && (
                <div className="text-red-500">{formik.errors.amenities}</div>
              )}
            </div>
          </div>
          <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 ">
            <button
              type="submit"
              className="btn1 !rounded !px-10"
              // onClick={() => setCurrentStep(3)}
            >
              Next
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default Amenities;
