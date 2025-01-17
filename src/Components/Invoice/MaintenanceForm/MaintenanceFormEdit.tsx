import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Formik,
  FormikProvider,
  useFormik,
} from "formik";
import { maintenanceSchemaValidation } from "../../../utils/validations/maintenanceSchema";
import { Form, useParams } from "react-router-dom";
import { MaintenanceFormValues } from "../../../types/maintenanceTypes";
import ComponentHeader from "../../ComponentHeader/ComponentHeader";
import { DashboardContext } from "../../../ContextApi";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import userImg from "../../../assets/images/userImg.png";

import { uploadFile } from "../../../services/apiServices";
import { SelectionGroup } from "../../SelectionGroup/SelectionGroup";
import ImageUploadField from "../../ImageUploadField/ImageUploadField";
import Input from "../../Input/Input";
import { calculateSubtotalAndVAT } from "../../../utils/common";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import ReactQuillInput from "../../ReactQuillInput/ReactQuillInput";
import { useFetchMaintenanceById } from "../../../hooks/react-query/revenue/useFetchMaintenanceById";
import { useUpdateMaintenance } from "../../../hooks/react-query/revenue";
import { User } from "../../../types/usersTypes";
import EssentialWorksField from "../../EssentialWorksField/EssentialWorksField";

const uploadFileHandler = async (folder = "maintenance", file: File) => {
  const { imageUrl } = await uploadFile(folder, file);
  return { imageUrl };
};

const MaintenanceFormEdit: React.FC<{}> = ({}) => {
  const { id } = useParams();
  const { setIsActiveMobileMenu } = useContext(DashboardContext) as {
    setIsActiveMobileMenu: (isActive: boolean) => void;
  };

  const [selectedValue, setSelectedValue] = useState("");

  const { data, isLoading, isError, error } = useFetchMaintenanceById({
    id: id || "",
  });
  const { mutate: updateMaintenance, isPending } = useUpdateMaintenance();

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
      setSelectedProperty(data.property_id._id || "");
      setSelectedMonth(data.statementPeriod);
    }
  }, [data]);

  const handleSelectedUserChange = (user: User | null) => setCurrentUser(user);
  const handleUserChange = (value: string | number | (string | number)[]) =>
    setSelectedValue(value as any);
  const handlePropertyChange = (value: string | number | (string | number)[]) =>
    setSelectedProperty(value);
  const handleMonthChange = (value: string) => setSelectedMonth(value);

  const initialValuesData = {
    selectedValue: selectedValue || "",
    selectedProperty: selectedProperty || "",
    selectedMonth: selectedMonth || "",
    selectedUser: currentUser,
  };

  const initialValues: MaintenanceFormValues = {
    property_id: data?.property_id._id || "",
    essentialWorksImages: data?.essentialWorksImages || [
      { url: "", work_name: "" },
    ],
    essentialWorks: data?.essentialWorks || [
      { itemService: "", quantity: 0, priceUnit: 0, priceSummary: 0 },
    ],
    companyDetails: data?.companyDetails || {
      name: "",
      address: "",
      phone: "",
    },
    ownerDetails: data?.ownerDetails || {
      name: "",
      address: "",
      phone: "",
    },
    subtotal: data?.subtotal || 0,
    tax: data?.tax || 0,
    totalMaintenceCost: data?.totalMaintenceCost || 0,
    receivedAmount: data?.receivedAmount || 0,
    amountOwedToFP: data?.amountOwedToFP || 0,
    bank_details: data?.bank_details._id || "",
    notes: data?.notes || "",
    statementPeriod: data?.statementPeriod || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: maintenanceSchemaValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateMaintenance(
        { id: id || "", invoiceData: values },
        {
          onSuccess: () => {
            console.log("Update Successful");
          },
        }
      );
    },
  });

  useEffect(() => {
    if (
      formik.values.receivedAmount > 0 &&
      formik.values.essentialWorks.length > 0
    ) {
      const { subtotal, total, vatTax } = calculateSubtotalAndVAT(
        formik.values.essentialWorks,
        data?.tax || 0
      );

      formik.setFieldValue("subtotal", subtotal);
      formik.setFieldValue("totalMaintenceCost", total);
      formik.setFieldValue("tax", vatTax);
      formik.setFieldValue(
        "amountOwedToFP",
        formik.values.receivedAmount - total
      );
    }
  }, [formik.values.receivedAmount, formik.values.essentialWorks, data]);

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div>
        <ComponentHeader
          title="Edit Maintenance"
          linkText="Back to Maintenance List"
          linkTo="/admin/maintenances"
          userImage={userImg}
          onMenuClick={() => setIsActiveMobileMenu(true)}
        />
        <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
          <SelectionGroup
            onUserChange={handleUserChange}
            onPropertyChange={handlePropertyChange}
            onMonthChange={handleMonthChange}
            onSelectedUserChange={handleSelectedUserChange}
            initialValues={initialValuesData}
          />
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    name="receivedAmount"
                    type="number"
                    label="Received Amount"
                    value={formik.values.receivedAmount}
                    onChangeValue={(value) =>
                      formik.setFieldValue("receivedAmount", value)
                    }
                  />
                  <Input
                    name="tax"
                    type="number"
                    label="Tax Amount"
                    value={formik.values.tax}
                    disabled
                  />
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
                            key={index}
                            index_number={index}
                            value={image}
                            onChange={(updatedValue) =>
                              arrayHelpers.replace(index, updatedValue)
                            }
                            onRemove={() => arrayHelpers.remove(index)}
                            uploadFile={uploadFileHandler}
                            onRemoveEmpty={() => {
                              const index =
                                formik.values.essentialWorksImages.findIndex(
                                  (image) => !image.url && !image.work_name
                                );
                              if (index !== -1) {
                                arrayHelpers.remove(index);
                              }
                            }}
                          />
                        )
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="p-4 space-y-4 bg-white rounded-lg shadow-sm mt-5">
                <ReactQuillInput
                  name="notes"
                  label="Notes"
                  placeholder="Write your notes details..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-primary p-2 rounded flex items-center gap-2 text-white hover:bg-[#967e56] transition-colors w-full text-center"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </DataHandler>
  );
};

export default MaintenanceFormEdit;
