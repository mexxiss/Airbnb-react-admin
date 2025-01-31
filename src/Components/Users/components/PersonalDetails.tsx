import { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "flowbite-react";
import { CloseOutlined, EditOutlined } from "@mui/icons-material";
import userImg2 from "../../../assets/images/userImg2.png";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { AddressForm } from "./AddressForm";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import { useAddressDetails } from "../../../hooks/custom-hook/useAddressDetails";
import { usePersonalDetails } from "../../../hooks/custom-hook/usePersonalDetails";

const PersonalDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const { id } = useParams();

  const {
    formik: personalFormik,
    finalData: personalData,
    isLoading: personalLoading,
    isError: personalError,
    error: personalErrorData,
  } = usePersonalDetails(id || "", () => setOpenModal(false));

  const {
    formik: addressFormik,
    finalData: addressData,
    isLoading: addressLoading,
    isError: addressError,
    error: addressErrorData,
  } = useAddressDetails(id || "", () => setOpenAddressModal(false));

  const isLoading = personalLoading || addressLoading;
  const isError = personalError || addressError;
  const error = personalErrorData || addressErrorData;

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
              {addressData?.address ? "Edit Address" : "Add Address"}
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white px-4 py-6 rounded-md shadow">
          <div>
            <div className="grid md:grid-cols-2 items-start gap-5">
              <div>
                <div className="flex flex-col sm:flex-row gap-3 items-center text-center sm:text-start relative w-max mx-auto sm:mx-0 pr-10">
                  <div className="w-16 h-16 min-w-16 rounded-full bg-gray-500 overflow-hidden border">
                    <img src={personalData?.profile_img || userImg2} alt="" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      {personalData?.first_name} {personalData?.last_name}
                    </p>
                    <p className="text-sm">{personalData?.email[0] || "N/A"}</p>
                    {personalData?.phone[0] && (
                      <p className="text-sm mt-0.5">{personalData?.phone[0]}</p>
                    )}
                  </div>
                  <button
                    className="absolute bottom-1 right-0 hover:text-primary"
                    onClick={() => setOpenModal(true)}
                  >
                    <EditOutlined />
                  </button>
                </div>
              </div>
              <div className=" text-center sm:text-start">
                <p className="text-text3">
                  {[
                    addressData?.address?.building_no,
                    addressData?.address?.street,
                    addressData?.address?.city,
                    addressData?.address?.area,
                    addressData?.address?.landmark,
                    addressData?.address?.country,
                    addressData?.address?.pincode &&
                      `(${addressData?.address?.pincode})`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p className="text-sm text-text3 mt-1">
                  {personalData?.email[1]}
                </p>
                <p className="text-sm text-text3 mt-0.5">
                  {personalData?.phone[1]}
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
                Personal Detail Edit
              </h6>
              <button onClick={() => setOpenModal(false)}>
                <CloseOutlined />
              </button>
            </div>
            <div>
              <PersonalDetailsForm formik={personalFormik} />
              <div className="mt-4 text-end">
                <button
                  disabled={!personalFormik.dirty}
                  onClick={async () => {
                    await personalFormik.submitForm();
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
        <Modal
          show={openAddressModal}
          onClose={() => setOpenAddressModal(false)}
          size="3xl"
        >
          <Modal.Body>
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-xl font-medium text-primary">
                {addressData?.address ? "Edit Address" : "Add Address"}
              </h6>
              <button onClick={() => setOpenAddressModal(false)}>
                <CloseOutlined />
              </button>
            </div>
            <div>
              <AddressForm formik={addressFormik} />
              <div className="mt-4 text-end">
                <button
                  onClick={async () => {
                    await addressFormik.submitForm();
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
