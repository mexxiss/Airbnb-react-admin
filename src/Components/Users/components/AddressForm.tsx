import React from "react";
import { Form, FormikProvider } from "formik";
import Input from "../../Input/Input";

export const AddressForm = ({ formik }: { formik: any }) => {
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            name="building_no"
            label="Building No"
            type="text"
            placeholder="Enter Building No"
          />
          <Input
            name="street"
            label="Street"
            type="text"
            placeholder="Enter Street"
          />
          <div>
            <Input
              name="city"
              label="City"
              type="text"
              placeholder="Enter City"
              required
            />
            {formik.touched?.city && formik.errors?.city && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors?.city}
              </div>
            )}
          </div>
          <div>
            <Input
              name="area"
              label="Area"
              type="text"
              placeholder="Enter Area"
              required
            />
            {formik.touched?.area && formik.errors?.area && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.area}
              </div>
            )}
          </div>
          <Input
            name="landmark"
            label="Landmark"
            type="text"
            placeholder="Enter Landmark"
          />
          <div>
            <Input
              name="country"
              label="Country"
              type="text"
              placeholder="Enter Country"
              required
            />
            {formik.touched?.country && formik.errors?.country && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors?.country}
              </div>
            )}
          </div>
          <div>
            <Input
              name="pincode"
              label="Zip code"
              type="text"
              placeholder="Enter Pincode"
              required
            />
            {formik.touched?.pincode && formik.errors?.pincode && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors?.pincode}
              </div>
            )}
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};
