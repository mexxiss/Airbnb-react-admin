import React, { useEffect, useMemo, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";

import Input from "../Input/Input";
import { useOnlyPropertyUsersQuery } from "../../hooks/react-query/users-queries";
import { usePropertiesByUser } from "../../hooks/react-query/properties-query";
import CustomSelectInput from "../SelectInput/CustomSelectInput";
import {
  useCreateLicense,
  useFetchLicenseById,
} from "../../hooks/react-query/create-license";
import { useParams } from "react-router-dom";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { useUpdateLicense } from "../../hooks/react-query/create-license/useUpdateLicense";
import { detLicenseSchema } from "../../utils/validations/detLicenseSchema";

const formatDate = (date: string | Date) =>
  new Date(date).toISOString().split("T")[0];

const DETLicenseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const { data: license, isLoading: licenseIsLoading } = useFetchLicenseById({
    licenseId: id || "",
  });
  const { data, isLoading, isError, error } = useOnlyPropertyUsersQuery();
  const { mutate, isPending } = useCreateLicense();
  const { mutate: updateLicenseMutate, isPending: updateisPending } =
    useUpdateLicense();

  const userData = useMemo(
    () =>
      data?.data?.map((item: any) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item._id,
      })) || [],
    [data]
  );

  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[]
  >("");
  const [selectedProperty, setSelectedProperty] = useState<
    string | number | (string | number)[]
  >("");

  const { data: propertyData, isLoading: proIsLoading } = usePropertiesByUser(
    selectedValue || ""
  );

  const propertyDataModified = useMemo(
    () =>
      propertyData?.properties.map((item: any) => ({
        label: item?.title,
        value: item._id,
      })) || [],
    [propertyData]
  );

  const initialData = useMemo(
    () => ({
      licenseNumber: license?.data?.licenseNumber || "",
      owner: license?.data?.owner || "",
      property: license?.data?.property || "",
      status: license?.data?.status || "unpaid",
      price: license?.data?.price || 370,
      issueDate: license?.data?.issueDate
        ? formatDate(license.data.issueDate)
        : formatDate(new Date()),
      expiryDate: license?.data?.expiryDate
        ? formatDate(license.data.expiryDate)
        : formatDate(
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          ),
      renewed: license?.data?.renewed || false,
      renewalDate: license?.data?.renewalDate || "",
    }),
    [license]
  );

  useEffect(() => {
    if (isEditMode && license) {
      setSelectedValue(
        typeof license?.data?.owner === "object"
          ? license.data.owner._id || ""
          : ""
      );
      setSelectedProperty(
        typeof license?.data?.property === "object"
          ? license.data.property._id || ""
          : ""
      );
      formik.setValues({
        ...formik.values,
        issueDate: formatDate(license.data.issueDate),
        expiryDate: formatDate(license.data.expiryDate),
      });
    }
  }, [isEditMode, license]);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: detLicenseSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (isEditMode && id) {
          updateLicenseMutate({ id, data: values });
        } else {
          mutate(
            {
              ...values,
              status: values.status as "paid" | "unpaid",
              owner:
                typeof values.owner === "string"
                  ? values.owner
                  : values.owner._id || "",
              property:
                typeof values.property === "string"
                  ? values.property
                  : values.property._id || "",
            },
            {
              onSuccess: () => {
                formik.resetForm();
                setSelectedValue("");
                setSelectedProperty("");
              },
            }
          );
        }
      } catch (error) {
        console.error("Failed to update license:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  const handleUserSelection = (
    value: string | number | (string | number)[]
  ) => {
    setSelectedValue(value);
    formik.setFieldValue("owner", value);
  };
  const handlePropertySelection = (
    value: string | number | (string | number)[]
  ) => {
    setSelectedProperty(value);
    formik.setFieldValue("property", value);
  };

  return (
    <DataHandler
      loadingStates={[isLoading, proIsLoading, licenseIsLoading]}
      errorStates={[{ isError, error }]}
    >
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <h5 className="text-22 text-primary font-bold mb-5">
          {isEditMode && id ? "Edit License" : "Add License"}
        </h5>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  name="licenseNumber"
                  type="text"
                  label="License Number"
                  placeholder="Enter License Number"
                  value={formik.values.licenseNumber}
                  onChangeValue={formik.handleChange}
                />
                {formik.touched.licenseNumber && formik.errors.licenseNumber ? (
                  <div className="text-red-600">
                    {formik.errors.licenseNumber}
                  </div>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <CustomSelectInput
                  label="Select User*"
                  options={userData}
                  value={selectedValue || ""}
                  onChange={handleUserSelection}
                  placeholder="Select an option"
                  className="mb-4"
                  // error={!selectedValue ? "This field is required" : ""}
                />
                {formik.touched.owner && formik.errors.owner ? (
                  <div className="text-red-600">{formik.errors.owner}</div>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <CustomSelectInput
                  label="Select Property*"
                  options={propertyDataModified}
                  value={selectedProperty || ""}
                  onChange={handlePropertySelection}
                  placeholder="Select an option"
                  className="mb-4"
                  // error={!selectedProperty ? "This field is required" : ""}
                />
                {formik.touched.property && formik.errors.property ? (
                  <div className="text-red-600">{formik.errors.property}</div>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <label>Status</label>
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="text-red-600">{formik.errors.status}</div>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <Input
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="Enter Price"
                  value={formik.values.price}
                  onChangeValue={formik.handleChange}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-600">{formik.errors.price}</div>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <Input
                  name="issueDate"
                  type="date"
                  label="Issue Date"
                  value={formik.values.issueDate}
                  onChangeValue={formik.handleChange}
                />
                {formik.touched.issueDate && formik.errors.issueDate ? (
                  <div className="text-red-600">{formik.errors.issueDate}</div>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <Input
                  name="expiryDate"
                  type="date"
                  label="Expiry Date"
                  value={formik.values.expiryDate}
                  onChangeValue={formik.handleChange}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <div className="text-red-600">{formik.errors.expiryDate}</div>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <label>Renewed</label>
                <input
                  name="renewed"
                  type="checkbox"
                  checked={formik.values.renewed}
                  onChange={formik.handleChange}
                  className="ml-2"
                />
              </div>

              {formik.values.renewed && (
                <div className="sm:col-span-2">
                  <Input
                    name="renewalDate"
                    type="date"
                    label="Renewal Date"
                    value={formik.values.renewalDate}
                    onChangeValue={formik.handleChange}
                  />
                  {formik.touched.renewalDate && formik.errors.renewalDate ? (
                    <div className="text-red-600">
                      {formik.errors.renewalDate}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn1 flex items-center justify-center"
                disabled={isPending || updateisPending}
              >
                {isPending || updateisPending
                  ? isEditMode
                    ? "Updating..."
                    : "Submitting..."
                  : isEditMode
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </DataHandler>
  );
};

export default DETLicenseForm;
