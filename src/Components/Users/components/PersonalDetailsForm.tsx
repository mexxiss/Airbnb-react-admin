import React, { useState } from "react";
import { Form, FormikProvider } from "formik";
import Input from "../../Input/Input";
import CustomPhoneInput from "../../PhoneInput/CustomPhoneInput";
import userImg2 from "../../../assets/images/userImg2.png"
import { EditOutlined } from "@mui/icons-material";

export const PersonalDetailsForm = ({ formik }: { formik: any }) => {
  const [userImg, setUserImg] = useState<File | null>(null);
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <div className="relative min-w-28 w-28 h-28 rounded-full bg-gray-400 mx-auto">
            <img src={userImg ? URL.createObjectURL(userImg) : userImg2} className="w-full h-full object-cover rounded-full" />
            <label htmlFor="img" className=" cursor-pointer absolute bottom-0 -right-3"><EditOutlined /></label>
            <input name="profile_img" type="file" hidden id="img" onChange={(e) => setUserImg(e.target.files ? e.target.files[0] : null)} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Input
              name="first_name"
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              required
            />
            {formik.touched?.first_name && formik.errors?.first_name && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.first_name}
              </div>
            )}
          </div>
          <div>
            <Input
              name="last_name"
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              required
            />
            {formik.touched?.last_name && formik.errors?.last_name && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.last_name}
              </div>
            )}
          </div>
          <div>
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Enter Email"
              disabled
              required
            />
            {formik.touched?.email && formik.errors?.email && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.email}
              </div>
            )}
          </div>
          <CustomPhoneInput
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            country="ae"
            required
            formik={formik}
          />
          <div>
            <Input
              name="SecEmail"
              label="Secondary Email"
              type="email"
              placeholder="Enter Secondary Email"
            />
            {formik.touched?.SecEmail && formik.errors?.SecEmail && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.SecEmail}
              </div>
            )}
          </div>
          <CustomPhoneInput
            name="SecNumber"
            label="Secondary Phone Number"
            placeholder="Enter Secondary phone number"
            country="ae"
            formik={formik}
          />
          {/* <div>
            <Input
              name="country"
              label="Country"
              type="text"
              placeholder="Enter country"
            />

            {formik.touched?.country && formik.errors?.country && (
              <div className="text-red-600 mt-1 text-sm">
                {formik.errors.country}
              </div>
            )}
          </div> */}
        </div>
      </Form>
    </FormikProvider>
  );
};
