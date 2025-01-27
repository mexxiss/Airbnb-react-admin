import React, { useCallback, useContext, useEffect, useState } from "react";
import userImg from "../../assets/images/userImg.png";
import { DashboardContext } from "../../ContextApi";
import { MenuOutlined } from "@mui/icons-material";
import { User } from "../../types/usersTypes";
import { SelectionGroup } from "../SelectionGroup/SelectionGroup";
import useAuthStore from "../../store/authStore";
import { Form, FormikProvider, useFormik } from "formik";
import { furnishingValidationSchema } from "../../utils/validations/furnishingValidationSchema";
import SelectInput from "../SelectInput/SelectInput";
import { optionsStatuse } from "./utils/mock/staticData";
import { FurnishingFormData } from "../../types/furnishingTypes";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { generateRandomString } from "../../utils/common";
import { RegenerateInput } from "../RegenerateInput/RegenerateInput";
import Input from "../Input/Input";
import { useFetchBankDetailById } from "../../hooks/react-query/bank-details-queries";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { useParams } from "react-router-dom";
import { useFetchFurnishingDataById } from "../../hooks/react-query/revenue/useFetchFurnishingDataById";
import { useUpdateFurnishingInvoice } from "../../hooks/react-query/revenue";

const FurnishingInvoiceEdit = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useFetchFurnishingDataById({
    id: id || "",
  });

  console.log({ data });

  const { user } = useAuthStore();

  const {
    data: bankdetails,
    isLoading: bankdetailsIsLoading,
    isError: bankdetailsIsError,
    error: bankdetailsError,
  } = useFetchBankDetailById({ userId: user?._id || "" });

  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[]
  >(data?.property_id.user || "");

  const [selectedProperty, setSelectedProperty] = useState<
    string | number | (string | number)[]
  >(data?.property_id._id || "");

  const [selectedMonth, setSelectedMonth] = useState<string>(
    data?.statementPeriod || ""
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (data) {
      setSelectedValue(data?.property_id?.user || "");
      setSelectedProperty(data.property_id._id);
      setSelectedMonth(data.statementPeriod);
    }
  }, [data]);

  const handleSelectedUserChange = (user: User | null) => setCurrentUser(user);
  const handleUserChange = (value: string | number | (string | number)[]) =>
    setSelectedValue(value);
  const handlePropertyChange = (value: string | number | (string | number)[]) =>
    setSelectedProperty(value);
  const handleMonthChange = (value: string) => setSelectedMonth(value);

  const handleInvoiceChange = useCallback(
    (setFieldValue: (field: string, value: any) => void) => (value: string) => {
      setFieldValue("invoiceNumber", value);
    },
    []
  );

  const initialValuesData = {
    selectedValue: selectedValue || "",
    selectedProperty: selectedProperty || "",
    selectedMonth: selectedMonth || "",
    selectedUser: currentUser,
  };

  const initialValues: FurnishingFormData = {
    invoiceNumber: data?.invoiceNumber || "",
    statementPeriod: selectedMonth || "",
    property_id: selectedProperty as string,
    companyDetails: {
      name: `${user?.first_name} ${user?.last_name}`,
      address: `${user?.address.street} ${user?.address.country}`,
      phone: user?.phone[0] || user?.phone[1] || "",
    },
    ownerDetails: {
      name: `${currentUser?.first_name} ${currentUser?.last_name}`,
      address: `${currentUser?.address?.street} ${currentUser?.address?.country}`,
      phone: currentUser?.phone[0] || currentUser?.phone[1] || "",
    },
    status: "Pending",
    furnishingDetails: "",
    totalFurnishingCost: 0,
    receivedAmount: 0,
    amountOwedToFP: 0,
    bank_details: bankdetails?.data?._id || "",
    notes:
      "<p>If you have any query regarding to furnishing invoice, then you can contact us on official mail</p>",
  };

  const { mutate: updateFurnishingInvoice, isPending } =
    useUpdateFurnishingInvoice();

  const formik = useFormik({
    initialValues,
    validationSchema: furnishingValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        updateFurnishingInvoice({ id: id || "", invoiceData: values });
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...initialValues,
        statementPeriod: data?.statementPeriod || selectedMonth,
        property_id:
          data?.property_id._id ||
          (typeof selectedProperty === "string" ? selectedProperty : ""),
        companyDetails: data?.companyDetails || initialValues.companyDetails,
        ownerDetails: data?.ownerDetails || initialValues.ownerDetails,
        status:
          data?.status === "Paid" ||
          data?.status === "Overdue" ||
          data?.status === "Pending"
            ? data.status
            : "Pending",
        furnishingDetails: data?.furnishingDetails || "",
        totalFurnishingCost: data?.totalFurnishingCost || 0,
        receivedAmount: data?.receivedAmount || 0,
        amountOwedToFP: data?.amountOwedToFP || 0,
        bank_details: bankdetails?.data?._id || "",
        notes: data?.notes || initialValues.notes,
      });
    }
  }, [data, bankdetails?.data, selectedMonth, selectedProperty, currentUser]);

  useEffect(() => {
    if (formik.values.receivedAmount && formik.values.totalFurnishingCost) {
      formik.setFieldValue(
        "amountOwedToFP",
        formik.values.receivedAmount - formik.values.totalFurnishingCost
      );
    }
  }, [formik.values.receivedAmount, formik.values.totalFurnishingCost]);

  <DataHandler
    loadingStates={[isLoading, bankdetailsIsLoading]}
    errorStates={[{ isError, error }]}
  />;

  return (
    <div>
      {/* UI */}
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden hover:text-primary active:text-primary">
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">
            Edit Furnishing Invoice
          </h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
            <SelectionGroup
              onUserChange={handleUserChange}
              onPropertyChange={handlePropertyChange}
              onMonthChange={handleMonthChange}
              onSelectedUserChange={handleSelectedUserChange}
              initialValues={initialValuesData}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <SelectInput
                  label="Status Select"
                  name="status"
                  options={optionsStatuse}
                  placeholder="Choose an option"
                  className="mb-4"
                />
              </div>
              <div>
                <label
                  htmlFor="invoiceNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Furnishing Invoice Number
                </label>
                <RegenerateInput
                  disabled={true}
                  value={formik.values.invoiceNumber}
                  onChange={handleInvoiceChange(formik.setFieldValue)}
                  generateValue={generateRandomString}
                  className="mt-1"
                />
                {formik?.touched?.invoiceNumber &&
                  formik?.errors?.invoiceNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik?.errors?.invoiceNumber}
                    </p>
                  )}
              </div>
              <div>
                <Input
                  name="receivedAmount"
                  type="number"
                  label="Received Amount"
                  placeholder="Received Amount"
                  value={formik.values.receivedAmount}
                  onChangeValue={(value) =>
                    formik.setFieldValue("receivedAmount", value)
                  }
                />
                {formik.errors.receivedAmount && (
                  <div className="text-red-600">
                    {formik.errors.receivedAmount}
                  </div>
                )}
              </div>
              <div>
                <Input
                  name="totalFurnishingCost"
                  type="number"
                  label="Total Furnishing Cost"
                  placeholder="Total Furnishing Cost"
                  value={formik.values.totalFurnishingCost}
                  onChangeValue={(value) =>
                    formik.setFieldValue("totalFurnishingCost", value)
                  }
                />
                {formik.errors.totalFurnishingCost && (
                  <div className="text-red-600">
                    {formik.errors.totalFurnishingCost}
                  </div>
                )}
              </div>

              <div>
                <Input
                  name="amountOwedToFP"
                  type="number"
                  label="Amount Owed To FP"
                  placeholder="Amount Owed To FP"
                  value={formik.values.amountOwedToFP}
                />
                {formik.errors.amountOwedToFP && (
                  <div className="text-red-600">
                    {formik.errors.amountOwedToFP}
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <ReactQuillInput
                  name="furnishingDetails"
                  label="Furnishing Details"
                  placeholder="Write your furnishing details..."
                />
              </div>
              {/* Notes */}
              <div className="sm:col-span-2">
                <ReactQuillInput
                  name="notes"
                  label="Notes"
                  placeholder="Write your notes details..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-primary p-2 text-white rounded"
              >
                {isPending ? "Submitting..." : "Submit Furnishing Invoice"}
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default FurnishingInvoiceEdit;
