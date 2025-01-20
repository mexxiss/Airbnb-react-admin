import React from "react";
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

const BankDetails = () => {
  const { id } = useParams();
  const [isOpen, toggleOpen] = useToggle();

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
      <div className="mt-10">
        {" "}
        <div className="flex items-center justify-between">
          <h6 className="text-lg text-text1 font-semibold">Bank Details</h6>
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
                disabled={!formik.dirty || isPending} // Disable Save button when no changes or submission in progress
                onClick={async () => {
                  await formik.submitForm();
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
                <div>
                  <Input
                    name="accountHolderName"
                    label="Account Name"
                    placeholder="Enter Account Name"
                    value={formik.values.accountHolderName}
                    disabled={!isOpen || isPending}
                  />
                </div>
                <div>
                  <Input
                    name="bankName"
                    label="Bank Name"
                    placeholder="Enter Bank Name"
                    value={formik.values.bankName}
                    disabled={!isOpen || isPending}
                  />
                </div>
                <div>
                  <Input
                    name="currency"
                    label="Currency"
                    placeholder="Enter Currency"
                    value={formik.values.currency}
                    disabled={!isOpen || isPending}
                  />
                </div>
                <div>
                  <Input
                    name="iban"
                    label="IBAN"
                    placeholder="Enter IBAN"
                    value={formik.values.iban}
                    disabled={!isOpen || isPending}
                  />
                </div>
                <div>
                  <Input
                    name="accountNumber"
                    label="Account Number"
                    placeholder="Enter Account Number"
                    value={formik.values.accountNumber}
                    disabled={!isOpen || isPending}
                  />
                </div>
                <div>
                  <Input
                    name="address"
                    label="Bank Address"
                    placeholder="Enter Bank Address"
                    value={formik.values.address}
                    disabled={!isOpen || isPending}
                  />
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </DataHandler>
  );
};

export default BankDetails;
