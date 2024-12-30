import { MenuOutlined } from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import { FormikProvider, useFormik } from "formik";
import { Form } from "react-router-dom";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { useFetchLegals } from "../../hooks/react-query/legals";
import { useMutateUpdateLegals } from "../../hooks/react-query/legals/useMutateUpdateLegals";
import { legalContentValidationSchema } from "../../utils/validations/legalsValidations";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import SelectInput from "../SelectInput/SelectInput";
import { optionsLegals } from "./utils/staticData";
import Input from "../Input/Input";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const AdminTermsAndConditions = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  const { data, error, isError, isLoading } = useFetchLegals({
    type: "terms",
  });

  const { mutate: createUpdateLegals, isPending } = useMutateUpdateLegals();

  const formik = useFormik({
    initialValues: {
      title: data?.data.title || "",
      body: data?.data.body || "",
      type: data?.data.type || "",
    },
    validationSchema: legalContentValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      createUpdateLegals(values);
    },
  });

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  return (
    <div>
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Terms & Conditions</h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    name="title"
                    type="text"
                    label="Title"
                    placeholder="Title"
                    value={formik.values.title}
                    onChangeValue={formik.handleChange}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-red-600">{formik.errors.title}</div>
                  ) : null}
                </div>
                <div className="sm:col-span-2">
                  <SelectInput
                    label="Select Type"
                    name="type"
                    options={optionsLegals}
                    placeholder="Choose an option"
                    className="mb-4"
                  />
                </div>
              </div>
              <div className="">
                <ReactQuillInput
                  name="body"
                  minHeight="150px"
                  placeholder="Terms & Conditions..."
                />
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    className="btn1 flex items-center justify-center"
                    type="submit"
                  >
                    {isPending ? "Saving.." : "Save"}
                  </button>
                  <button className="btn1 !bg-transparent border border-primary !text-primary hover:bg-primary hover:text-white flex items-center justify-center">
                    Preview
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminTermsAndConditions;
