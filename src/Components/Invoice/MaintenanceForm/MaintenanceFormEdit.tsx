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
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const { data, isLoading, isError, error } = useFetchMaintenanceById({
    id: id || "",
  });
  const { mutate: updateMaintenance, isPending } = useUpdateMaintenance();

  const initialValues: MaintenanceFormValues = {
    property_id: data?.property_id || "",
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
    bank_details: data?.bank_details || "",
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
        <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
          <SelectionGroup
            onUserChange={setSelectedValue}
            onPropertyChange={setSelectedProperty}
            onMonthChange={setSelectedMonth}
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

                <FieldArray
                  name="essentialWorksImages"
                  render={(arrayHelpers) => (
                    <div>
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
                          />
                        )
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ url: "", work_name: "" })
                        }
                      >
                        Add Image
                      </button>
                    </div>
                  )}
                />
              </div>

              <ReactQuillInput
                name="notes"
                label="Notes"
                placeholder="Write your notes details..."
              />

              <button type="submit">
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
