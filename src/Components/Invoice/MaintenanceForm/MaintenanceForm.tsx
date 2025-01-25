import { FieldArray, FormikProvider, useFormik } from "formik";
import { maintenanceSchemaValidation } from "../../../utils/validations/maintenanceSchema";
import { Form } from "react-router-dom";
import { MaintenanceFormValues } from "../../../types/maintenanceTypes";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { User } from "../../../types/usersTypes";
import { useFetchBankDetailById } from "../../../hooks/react-query/bank-details-queries";
import useAuthStore from "../../../store/authStore";
import { SelectionGroup } from "../../SelectionGroup/SelectionGroup";
import ImageUploadField from "../../ImageUploadField/ImageUploadField";
import { uploadFile } from "../../../services/apiServices";
import EssentialWorksField from "../../EssentialWorksField/EssentialWorksField";
import Input from "../../Input/Input";
import { useFetchTexData } from "../../../hooks/react-query/revenue";
import { calculateSubtotalAndVAT } from "../../../utils/common";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import ReactQuillInput from "../../ReactQuillInput/ReactQuillInput";
import { useCreateMaintenance } from "../../../hooks/react-query/revenue/useCreateMaintenance";

const uploadFileHandler = async (
  folder: string = "maintenance",
  file: File
): Promise<{ imageUrl: string }> => {
  const { imageUrl } = await uploadFile(folder, file);
  return { imageUrl };
};
const MaintenanceForm: React.FC = () => {
  const { user } = useAuthStore();
  const {
    data: taxData,
    isLoading: texIsLoading,
    error: texError,
    isError: texIsError,
  } = useFetchTexData();

  const {
    data: bankdetails,
    isLoading,
    isError,
    error,
  } = useFetchBankDetailById({
    userId: user?._id || "",
  });

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

  const initialValues: MaintenanceFormValues = {
    property_id: (selectedProperty as string) || "",
    essentialWorksImages: [
      {
        url: "",
        work_name: "",
      },
    ],
    essentialWorks: [
      {
        itemService: "",
        quantity: 0,
        priceUnit: 0,
        priceSummary: 0,
      },
    ],
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
    subtotal: 0,
    tax: 0,
    totalMaintenceCost: 0,
    receivedAmount: 0,
    amountOwedToFP: 0,
    bank_details: bankdetails?.data?._id || "",
    notes: "",
    statementPeriod: selectedMonth,
  };

  const { mutate: createMaintenanceInvoice, isPending } =
    useCreateMaintenance();

  const formik = useFormik({
    initialValues,
    validationSchema: maintenanceSchemaValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log({ values });

      createMaintenanceInvoice(values, {
        onSuccess: () => {
          formik.resetForm();
        },
      });
    },
  });

  useEffect(() => {
    if (
      formik.values.receivedAmount > 0 &&
      formik.values.essentialWorks.length > 0
    ) {
      const { subtotal, total, vatTax } = calculateSubtotalAndVAT(
        formik.values.essentialWorks,
        taxData?.data.vat_tax_rate || 0
      );

      formik.setFieldValue("subtotal", subtotal);
      formik.setFieldValue("totalMaintenceCost", total);
      formik.setFieldValue("tax", vatTax);
      formik.setFieldValue(
        "amountOwedToFP",
        formik.values.receivedAmount - total
      );
    }
  }, [
    formik.values.receivedAmount,
    formik.values.essentialWorks,
    taxData?.data.vat_tax_rate,
  ]);

  console.log({ detData: formik.values.essentialWorksImages });

  return (
    <DataHandler
      loadingStates={[texIsLoading, isLoading]}
      errorStates={[
        { isError: texIsError, error: texError },
        { isError, error },
      ]}
    >
      <div>
        <div className="">
          <div className="mb-5">
            <h5 className="text-22 text-primary font-bold">
              Create Maintenance Invoice
            </h5>
          </div>
          <SelectionGroup
            onUserChange={handleUserChange}
            onPropertyChange={handlePropertyChange}
            onMonthChange={handleMonthChange}
            onSelectedUserChange={handleSelectedUserChange}
          />

          {selectedValue && selectedProperty && (
            <div className="">
              <div className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-8 rounded-2xl shadow-lg bg-white">
                    <FormikProvider value={formik}>
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-7">
                          <div className="grid sm:grid-cols-2 gap-4">
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
                                name="tax"
                                type="number"
                                label="Tax Amount"
                                placeholder="Tax"
                                value={formik.values.tax}
                                disabled
                              />
                              {formik.errors.tax ? (
                                <div className="text-red-600">
                                  {formik.errors.tax}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <EssentialWorksField
                            values={formik.values.essentialWorks}
                            onChange={formik.handleChange}
                            setFieldValue={formik.setFieldValue}
                          />

                          <FieldArray
                            name="essentialWorksImages"
                            render={(arrayHelpers) => (
                              <div className="p-4 space-y-4 bg-white rounded-lg shadow-sm">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    Essential Works Images
                                  </h3>
                                  <button
                                    className="bg-primary p-2 rounded flex items-center gap-2 text-white hover:bg-[#967e56] transition-colors"
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        url: "",
                                        work_name: "",
                                      })
                                    }
                                  >
                                    <AddPhotoAlternateIcon /> Add Image
                                  </button>
                                </div>

                                {formik.values.essentialWorksImages.map(
                                  (image, index) => (
                                    <ImageUploadField
                                      index_number={index}
                                      key={index}
                                      value={image}
                                      onChange={(updatedValue) => {
                                        console.log({ updatedValue });

                                        arrayHelpers.replace(
                                          index,
                                          updatedValue
                                        );
                                      }}
                                      onRemove={() =>
                                        arrayHelpers.remove(index)
                                      }
                                      onRemoveEmpty={() => {
                                        const index =
                                          formik.values.essentialWorksImages.findIndex(
                                            (image) =>
                                              !image.url && !image.work_name
                                          );
                                        if (index !== -1) {
                                          arrayHelpers.remove(index);
                                        }
                                      }}
                                      uploadFile={uploadFileHandler}
                                    />
                                  )
                                )}
                              </div>
                            )}
                          />
                        </div>
                        <div className="mt-6 p-4 space-y-4 bg-white rounded-lg shadow-sm">
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
                        <button
                          type="submit"
                          className="mt-6 bg-primary p-2 rounded flex items-center gap-2 text-white hover:bg-[#967e56] transition-colors w-full text-center"
                        >
                          {isPending ? "Submitting..." : "Submit"}
                        </button>
                      </Form>
                    </FormikProvider>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DataHandler>
  );
};

export default MaintenanceForm;
