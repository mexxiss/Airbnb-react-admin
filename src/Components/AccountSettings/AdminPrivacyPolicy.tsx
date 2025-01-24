import { FormikProvider, useFormik } from "formik";
import { Form } from "react-router-dom";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { useFetchLegals } from "../../hooks/react-query/legals/useFetchLegals";
import { useMutateUpdateLegals } from "../../hooks/react-query/legals/useMutateUpdateLegals";
import Input from "../Input/Input";
import { legalContentValidationSchema } from "../../utils/validations/legalsValidations";
import SelectInput from "../SelectInput/SelectInput";
import { optionsLegals } from "./utils/staticData";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";

const AdminPrivacyPolicy = () => {
  const { data, error, isError, isLoading } = useFetchLegals({
    type: "privacy",
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
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <h5 className="text-22 text-primary font-bold mb-5">Privacy Policy</h5>
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
                  placeholder="Policy..."
                  minHeight="150px"
                />
              </div>
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
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminPrivacyPolicy;
