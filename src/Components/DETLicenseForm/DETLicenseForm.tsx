"use client";

import React from "react";
import { Formik, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";

interface DETLicenseFormValues {
  licenseNumber: string;
  owner: string;
  property: string;
  status: "paid" | "unpaid";
  price: number;
  issueDate: string;
  expiryDate: string;
  renewed: boolean;
  renewalDate?: string;
}

const validationSchema = Yup.object().shape({
  licenseNumber: Yup.string().required("License number is required").trim(),
  owner: Yup.string().required("Owner is required"),
  property: Yup.string().required("Property is required"),
  status: Yup.string().oneOf(["paid", "unpaid"]).required("Status is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  issueDate: Yup.date().required("Issue date is required"),
  expiryDate: Yup.date().required("Expiry date is required"),
  renewed: Yup.boolean(),
  renewalDate: Yup.date().when("renewed", (renewed, schema) =>
    renewed
      ? schema.required("Renewal date is required when renewed is true")
      : schema
  ),
});

const DETLicenseForm: React.FC = () => {
  const initialData: DETLicenseFormValues = {
    licenseNumber: "",
    owner: "",
    property: "",
    status: "unpaid",
    price: 370,
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
    renewed: false,
    renewalDate: "",
  };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log("Submitting form with values:", values);
      } catch (error) {
        console.error("Failed to update user details:", error);
        alert("Failed to update details. Please try again.");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
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
              <Input
                name="owner"
                type="text"
                label="Owner"
                placeholder="Enter Owner Name"
                value={formik.values.owner}
                onChangeValue={formik.handleChange}
              />
              {formik.touched.owner && formik.errors.owner ? (
                <div className="text-red-600">{formik.errors.owner}</div>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <Input
                name="property"
                type="text"
                label="Property"
                placeholder="Enter Property"
                value={formik.values.property}
                onChangeValue={formik.handleChange}
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
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default DETLicenseForm;
