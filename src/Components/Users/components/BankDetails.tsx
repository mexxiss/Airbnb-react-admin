import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchBankDetailById } from "../../../hooks/react-query/bank-details-queries";
import { Form, FormikProvider, useFormik } from "formik";
import Input from "../../Input/Input";
import Loader from "../../Loader/Loader";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";
import { useToggle } from "../../../hooks/custom-hook/useToggle";
import { useUpsertBankDetails } from "../../../hooks/react-query/bank-details-queries/useUpsertBankDetails";
import { showToast } from "../../../utils/toaster/toastWrapper";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import { Modal } from "flowbite-react";
import { CloseOutlined } from "@mui/icons-material";

const BankDetails = () => {
  const { id } = useParams();
  const [isOpen, toggleOpen] = useToggle();
  const [openModal, setOpenModal] = useState(false)

  // Fetch user details
  const { data, isLoading, isError, error, refetch } = useFetchBankDetailById({
    userId: id || "",
  });

  const { mutate: upsertDetails, isPending } = useUpsertBankDetails();

  const initialValues = {
    accountHolderName: data?.data?.accountHolderName || "",
    bankName: data?.data?.bankName || "",
    currency: data?.data?.currency || "",
    iban: data?.data?.iban || "",
    accountNumber: data?.data?.accountNumber || "",
    address: data?.data?.address || "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (!id) {
        console.error();
        showToast("error", "User ID is missing or undefined");
        return;
      }

      upsertDetails(
        { userId: id!, details: values },
        {
          onSuccess: () => {
            formik.resetForm({ values });
            toggleOpen(false);
            refetch();
          },
        }
      );
      console.log("Submitted Values:", values);
    },
    enableReinitialize: true,
  });

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div className="mt-6">
        {" "}
        <div className="flex items-center justify-between">
          <h6 className="text-lg text-text1 font-semibold">Bank Details</h6>
          <div>
            <button
              onClick={() => setOpenModal(true)}
              className="btn1 h-10 !px-8 tracking-wider"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white px-4 py-6 rounded-md shadow">
          <div>
            <ul className="max-w-[500px] flex gap-2 sm:gap-1 flex-col">
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">Account Name</span>
                <span className="font-medium">{data?.data?.accountHolderName === "" ? "-" : data?.data?.accountHolderName}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">Bank Name</span>
                <span className="font-medium">{data?.data?.bankName === "" ? "-" : data?.data?.bankName}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">Currency</span>
                <span className="font-medium">{data?.data?.currency === "" ? "-" : data?.data?.currency}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">IBAN</span>
                <span className="font-medium">{data?.data?.iban === "" ? "-" : data?.data?.iban}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">Account Number</span>
                <span className="font-medium">{data?.data?.accountNumber === "" ? "-" : data?.data?.accountNumber}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-start justify-between">
                <span className="text-text3 w-[150px]">Bank Address</span>
                <span className="font-medium max-w-[250px] sm:text-end">{data?.data?.address === "" ? "-" : data?.data?.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
          <Modal.Body>
            <div className="flex items-center justify-between mb-4">
              <h6 className="text-xl font-medium text-primary">Bank Detail Edit</h6>
              <button onClick={() => setOpenModal(false)}><CloseOutlined /></button>
            </div>
            <div>
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="accountHolderName"
                        label="Account Name"
                        placeholder="Enter Account Name"
                        value={formik.values.accountHolderName}
                        disabled={isPending}
                      />
                    </div>
                    <div>
                      <Input
                        name="bankName"
                        label="Bank Name"
                        placeholder="Enter Bank Name"
                        value={formik.values.bankName}
                        disabled={isPending}
                      />
                    </div>
                    <div>
                      <Input
                        name="currency"
                        label="Currency"
                        placeholder="Enter Currency"
                        value={formik.values.currency}
                        disabled={isPending}
                      />
                    </div>
                    <div>
                      <Input
                        name="iban"
                        label="IBAN"
                        placeholder="Enter IBAN"
                        value={formik.values.iban}
                        disabled={isPending}
                      />
                    </div>
                    <div>
                      <Input
                        name="accountNumber"
                        label="Account Number"
                        placeholder="Enter Account Number"
                        value={formik.values.accountNumber}
                        disabled={isPending}
                      />
                    </div>
                    <div>
                      <Input
                        name="address"
                        label="Bank Address"
                        placeholder="Enter Bank Address"
                        value={formik.values.address}
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </div>
            <div className="mt-4 text-end">
              <button
                disabled={!formik.dirty || isPending} // Disable Save button when no changes or submission in progress
                onClick={async () => {
                  await formik.submitForm();
                  setOpenModal(false);
                }}
                className="btn1 h-10 !px-8 tracking-wider"
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </DataHandler>
  );
};

export default BankDetails;
