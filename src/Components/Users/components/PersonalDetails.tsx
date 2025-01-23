import { useEffect, useMemo, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useFetchDetailById } from "../../../hooks/react-query/users-queries";
import Input from "../../Input/Input";
import { FormikProvider, useFormik } from "formik";
import { useUpdateUserDetails } from "../../../hooks/react-query/users-queries/useUpdateUserDetails";
import { Address } from "../../../types/usersTypes";
import { showToast } from "../../../utils/toaster/toastWrapper";
import { Modal } from "flowbite-react";
import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import userImg2 from "../../../assets/images/userImg2.png";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import { editDetailValidationSchema } from "../../../utils/validations/editDetailValidationSchema";
import CustomPhoneInput from "../../PhoneInput/CustomPhoneInput";

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
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const { id } = useParams();

  // Fetch user details
  const { data, isLoading, isError, error, refetch } = useFetchDetailById({
    userId: id || "",
  });
  console.log("data:", data);

  const { mutate: updateUser } = useUpdateUserDetails();

  const finalData = useMemo(() => data?.data, [data]);

  const formik = useFormik({
    validationSchema: editDetailValidationSchema(false),
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
      phone: finalData?.phone[0] || "",
      SecEmail: finalData?.email[1] || "",
      SecNumber: finalData?.phone[1] || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const updates = {
          ...values,
          email: [values.email, values.SecEmail].filter(Boolean),
          phone: [`+${values.phone}`, values.SecNumber].filter(Boolean),
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

        updateUser(
          { id: id!, data: updates },
          {
            onSuccess: () => {
              formik.resetForm({ values });
              setOpenModal(false);
              refetch();
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
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div>
        <div className="flex items-center justify-between">
          <h6 className="text-lg text-text1 font-semibold">Personal Details</h6>
          <div>
            <button
              onClick={() => setOpenAddressModal(true)}
              className="btn1 rounded-full h-10 !px-8 tracking-wider"
            >
              {finalData?.address ? "Edit Address" : "Add Address"}
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white px-4 py-6 rounded-md shadow">
          <div>
            <div className="grid md:grid-cols-2 items-start gap-5">
              <div>
                <div className="flex flex-col sm:flex-row gap-3 items-center text-center sm:text-start relative w-max mx-auto sm:mx-0 pr-10">
                  <div className="w-16 h-16 min-w-16 rounded-full bg-gray-500 overflow-hidden border">
                    <img src={userImg2} alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {finalData?.first_name} {finalData?.last_name}
                    </p>
                    <p className="text-sm">{finalData?.email}</p>
                    {finalData?.phone[0] &&
                      <p className="text-sm mt-0.5">
                        {finalData?.phone[0]}
                      </p>
                    }
                  </div>
                  <button className="absolute bottom-1 right-0 hover:text-primary"
                    onClick={() => setOpenModal(true)}><EditOutlined /></button>
                </div>
              </div>
              <div className=" text-center sm:text-start">
                <p className="text-text3">
                  {[
                    finalData?.address?.building_no,
                    finalData?.address?.street,
                    finalData?.address?.city,
                    finalData?.address?.area,
                    finalData?.address?.landmark,
                    finalData?.address?.country,
                    finalData?.address?.pincode &&
                    `(${finalData?.address?.pincode})`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>

                <p className="text-text3 mt-0.5">
                  {finalData?.phone
                    ?.filter(Boolean)
                    .map((phone, index, array) => (
                      <>
                        {phone}
                        {index < array.length - 1 && <span>,&nbsp;</span>}
                      </>
                    ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Detail Modal */}
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
          <Modal.Body>
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-xl font-medium text-primary">
                Persoal Detail Edit
              </h6>
              <button onClick={() => setOpenModal(false)}>
                <CloseOutlined />
              </button>
            </div>
            <div>
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Input Fields */}
                    <div>
                      <Input
                        name="first_name"
                        label="First Name"
                        type="text"
                        placeholder="Enter First Name"
                        required
                      />
                      {formik.touched?.first_name &&
                        formik.errors?.first_name ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors.first_name}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        name="last_name"
                        label="Last Name"
                        type="text"
                        placeholder="Enter Last Name"
                        required
                      />
                      {formik.touched?.last_name && formik.errors?.last_name ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors.last_name}
                        </div>
                      ) : null}
                    </div>

                    <Input
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter Email"
                      disabled
                      required
                    />
                    <CustomPhoneInput
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      country="ae"
                      required
                      formik={formik}
                    />
                    <Input
                      name="SecEmail"
                      label="Secondary Email"
                      type="email"
                      placeholder="Enter Secondary Email"
                    />
                    <Input
                      name="SecNumber"
                      label="Secondary Phone Number"
                      type="text"
                      placeholder="Enter Secondary Phone Number"
                    />
                  </div>
                </Form>
              </FormikProvider>
              <div className="mt-4 text-end">
                <button
                  disabled={!formik.dirty}
                  onClick={async () => {
                    await formik.submitForm();
                  }}
                  className="btn1 rounded-full h-10 !px-8 tracking-wider"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Address Modal */}
        <Modal show={openAddressModal} onClose={() => setOpenAddressModal(false)} size="3xl">
          <Modal.Body>
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-xl font-medium text-primary">
                {finalData?.address ? "Edit Address" : "Add Address"}
              </h6>
              <button onClick={() => setOpenAddressModal(false)}>
                <CloseOutlined />
              </button>
            </div>
            <div>
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Input Fields */}
                    <Input
                      name="building_no"
                      label="Building No"
                      type="text"
                      placeholder="Enter Building No"
                    />
                    <Input
                      name="street"
                      label="Street"
                      type="text"
                      placeholder="Enter Street"
                    />
                    <div>
                      <Input
                        name="city"
                        label="City"
                        type="text"
                        placeholder="Enter City"
                        required
                      />
                      {formik.touched?.city && formik.errors?.city ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors?.city}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        name="area"
                        label="Area"
                        type="text"
                        placeholder="Enter Area"
                        required
                      />
                      {formik.touched?.area &&
                        formik.errors?.area ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors.area}
                        </div>
                      ) : null}
                    </div>
                    <Input
                      name="landmark"
                      label="Landmark"
                      type="text"
                      placeholder="Enter Landmark"
                    />
                    <div>
                      <Input
                        name="country"
                        label="Country"
                        type="text"
                        placeholder="Enter Country"
                        required
                      />
                      {formik.touched?.country && formik.errors?.country ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors?.country}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        name="pincode"
                        label="Zip code"
                        type="text"
                        placeholder="Enter Pincode"
                        required
                      />

                      {formik.touched?.pincode && formik.errors?.pincode ? (
                        <div className="text-red-600 mt-1 text-sm">
                          {formik?.errors?.pincode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Form>
              </FormikProvider>
              <div className="mt-4 text-end">
                <button
                  // disabled={!formik.dirty}
                  onClick={async () => {
                    await formik.submitForm();
                  }}
                  className="btn1 rounded-full h-10 !px-8 tracking-wider"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </DataHandler>
  );
};

export default PersonalDetails;
