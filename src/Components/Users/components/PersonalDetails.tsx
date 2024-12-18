import React, { useMemo } from "react";
import { Form, useParams } from "react-router-dom";
import { useFetchDetailById } from "../../../hooks/react-query/users-queries";
import Loader from "../../Loader/Loader";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";
import Input from "../../Input/Input";
import { FormikProvider, useFormik } from "formik";
import { useToggle } from "../../../hooks/custom-hook/useToggle";
import { useUpdateUserDetails } from "../../../hooks/react-query/users-queries/useUpdateUserDetails";
import { Address } from "../../../types/usersTypes";
import { showToast } from "../../../utils/toaster/toastWrapper";

export interface UserDetails {
  _id: string;
  first_name: string;
  last_name: string;
  email: string[];
  phone: string[];
  isLoggedIn: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

const PersonalDetails = () => {
  const [isOpen, toggleOpen] = useToggle();
  const { id } = useParams();

  // Fetch user details
  const { data, isLoading, isError, error } = useFetchDetailById({
    userId: id || "",
  });

  const { mutate: updateUser } = useUpdateUserDetails();

  const finalData = useMemo(() => data?.data, [data]);

  //   "building_no": "C90",
  //   "city": "Dubai",
  //   "street": "Arabian Ranches Road",
  //   "area": "Arabian Ranches",
  //   "landmark": "Close to Ranches Souk",
  //   "country": "Emirates",
  //   "pincode": "998877"

  const formik = useFormik({
    initialValues: {
      first_name: finalData?.first_name || "",
      last_name: finalData?.last_name || "",
      email: finalData?.email[0] || "",
      building_no: finalData?.address?.building_no || "",
      street: finalData?.address?.street || "",
      city: finalData?.address?.city || "",
      area: finalData?.address?.area || "",
      landmark: finalData?.address?.landmark || "",
      country: finalData?.address?.country || "",
      pincode: finalData?.address?.pincode || "",
      number: finalData?.phone[0] || "",
      SecEmail: finalData?.email[1] || "",
      SecNumber: finalData?.phone[1] || "",
    },
    enableReinitialize: true, // Ensure form values update when data changes
    onSubmit: async (values) => {
      try {
        const updates = {
          ...finalData,
          email: [values.email, values.SecEmail].filter(Boolean), // Remove empty secondary email
          phone: [values.number, values.SecNumber].filter(Boolean), // Remove empty secondary phone
          address: {
            street: values.street,
            building_no: values.building_no,
            city: values.city,
            area: values.area,
            landmark: values.landmark,
            country: values.country,
            pincode: values.pincode,
          },
        };

        if (!id) {
          console.error();
          showToast("error", "User ID is missing or undefined");
          return;
        }

        updateUser({ id: id!, data: updates });
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  // Render loading or error states
  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    return <ErrorHandleMessage msg={error?.message} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h6 className="text-lg text-primary font-semibold">Personal Details</h6>
        <div>
          {!isOpen ? (
            <button
              onClick={() => toggleOpen(!isOpen)}
              className="btn1 !rounded-none h-10 !px-8 tracking-wider"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                formik.submitForm();
                toggleOpen(!isOpen);
              }}
              className="btn1 !rounded-none h-10 !px-8 tracking-wider"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Input Fields */}
              <Input
                name="first_name"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                disabled={!isOpen}
              />
              <Input
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                disabled={!isOpen}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                disabled={!isOpen}
              />
              <Input
                name="building_no"
                label="Building No"
                type="text"
                placeholder="Enter Building No"
                disabled={!isOpen}
              />
              <Input
                name="street"
                label="Street"
                type="text"
                placeholder="Enter Street"
                disabled={!isOpen}
              />
              <Input
                name="city"
                label="City"
                type="text"
                placeholder="Enter City"
                disabled={!isOpen}
              />
              <Input
                name="area"
                label="Area"
                type="text"
                placeholder="Enter Area"
                disabled={!isOpen}
              />
              <Input
                name="landmark"
                label="Landmark"
                type="text"
                placeholder="Enter Landmark"
                disabled={!isOpen}
              />
              <Input
                name="country"
                label="Country"
                type="text"
                placeholder="Enter Country"
                disabled={!isOpen}
              />
              <Input
                name="pincode"
                label="Pincode"
                type="text"
                placeholder="Enter Pincode"
                disabled={!isOpen}
              />
              <Input
                name="number"
                label="Phone Number"
                type="text"
                placeholder="Enter Phone Number"
                disabled={!isOpen}
              />
              <Input
                name="SecEmail"
                label="Secondary Email"
                type="email"
                placeholder="Enter Secondary Email"
                disabled={!isOpen}
              />
              <Input
                name="SecNumber"
                label="Secondary Phone Number"
                type="text"
                placeholder="Enter Secondary Phone Number"
                disabled={!isOpen}
              />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default PersonalDetails;
