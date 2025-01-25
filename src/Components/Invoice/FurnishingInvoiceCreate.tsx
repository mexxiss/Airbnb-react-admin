import { useCallback, useEffect, useRef, useState } from "react";
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
import { useCreateFurnishingInvoice } from "../../hooks/react-query/revenue/useCreateFurnishingInvoice";

const FurnishingInvoiceCreate = () => {
  const { user } = useAuthStore();
  const {
    data: bankdetails,
    isLoading,
    isError,
    error,
  } = useFetchBankDetailById({
    userId: user?._id || "",
  });

  // Generate `invoiceNumber` only once
  const initialInvoiceNumber = useRef(generateRandomString());

  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[]
  >("");
  const [selectedProperty, setSelectedProperty] = useState<
    string | number | (string | number)[]
  >("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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

  const initialValues: FurnishingFormData = {
    invoiceNumber: initialInvoiceNumber.current || "",
    statementPeriod: selectedMonth || "",
    property_id: selectedProperty as string,
    companyDetails: {
      name: `${user?.first_name} ${user?.last_name}`,
      address: `${user?.address?.street} ${user?.address?.country}`,
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

  //** Api Hooks */

  const { mutate: createFurnishingInvoice, isPending } =
    useCreateFurnishingInvoice();

  const formik = useFormik({
    initialValues,
    validationSchema: furnishingValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        createFurnishingInvoice(values, {
          onSuccess: () => {
            formik.resetForm();
            initialInvoiceNumber.current = generateRandomString();
          },
        });
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (formik.values.receivedAmount && formik.values.totalFurnishingCost) {
      formik.setFieldValue(
        "amountOwedToFP",
        formik.values.receivedAmount - formik.values.totalFurnishingCost
      );
    }
  }, [formik.values.receivedAmount && formik.values.totalFurnishingCost]);

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <div className="mb-5">
                <h5 className="text-22 text-primary font-bold">
                  Create Furnishing Invoice
                </h5>
              </div>
              <SelectionGroup
                onUserChange={handleUserChange}
                onPropertyChange={handlePropertyChange}
                onMonthChange={handleMonthChange}
                onSelectedUserChange={handleSelectedUserChange}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="">
                  <SelectInput
                    label="Status Select"
                    name="status"
                    options={optionsStatuse}
                    placeholder="Choose an option"
                    className="mb-4"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="invoiceNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Furnishing Invoice Number
                  </label>
                  <RegenerateInput
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
                <div className="">
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
                  {formik.errors.receivedAmount ? (
                    <div className="text-red-600">
                      {formik.errors.receivedAmount}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <Input
                    name="totalFurnishingCost"
                    type="number"
                    label="Total Furnishing Cost"
                    placeholder="Total Furnishing Cost"
                    value={formik.values.totalFurnishingCost}
                    onChangeValue={(value) => {
                      formik.setFieldValue("totalFurnishingCost", value);
                    }}
                  />
                  {formik.errors.totalFurnishingCost ? (
                    <div className="text-red-600">
                      {formik.errors.totalFurnishingCost}
                    </div>
                  ) : null}
                </div>

                <div className="">
                  <Input
                    name="amountOwedToFP"
                    type="number"
                    label="Amount Owed To FP"
                    placeholder="Amount Owed To FP"
                    value={formik.values.amountOwedToFP}
                  />
                  {formik.errors.amountOwedToFP ? (
                    <div className="text-red-600">
                      {formik.errors.amountOwedToFP}
                    </div>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <div className="">
                    <ReactQuillInput
                      name="furnishingDetails"
                      label="Furnishing Details"
                      placeholder="Write your furnishing details..."
                    />
                  </div>
                </div>
                {/* Notes */}
                <div className="sm:col-span-2">
                  <div className="">
                    <ReactQuillInput
                      name="notes"
                      label="Notes"
                      placeholder="Write your notes details..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="bg-primary p-2 text-white rounded "
                >
                  {isPending ? "Submitting..." : "Submit Furnishing Invoice"}
                </button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </DataHandler>
  );
};

export default FurnishingInvoiceCreate;
