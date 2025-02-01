import { FormikProvider, useFormik, Form } from "formik";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { useFetchLegals } from "../../hooks/react-query/legals/useFetchLegals";
import { useMutateUpdateLegals } from "../../hooks/react-query/legals/useMutateUpdateLegals";
import Input from "../Input/Input";
import { legalContentValidationSchema } from "../../utils/validations/legalsValidations";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";

const BookingPrivacy = () => {
  const { data, error, isError, isLoading } = useFetchLegals({
    type: "booking_privacy",
  });

  const { mutate: createUpdateLegals, isPending } = useMutateUpdateLegals();

  const formik = useFormik({
    initialValues: {
      title: data?.data.title || "",
      body: data?.data.body || "",
      type: "booking_privacy",
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
      <div className="pt-4 overflow-y-auto pb-6">
        <div>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <div className="sm:col-span-2">
                  <SelectInput
                    label="Select Type"
                    name="type"
                    options={optionsLegals}
                    placeholder="Choose an option"
                    className=""
                  />
                </div> */}
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
              </div>
              <div className="mt-4">
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
                {/* <button className="btn1 !bg-transparent border border-primary !text-primary hover:bg-primary hover:text-white flex items-center justify-center">
                  Preview
                </button> */}
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default BookingPrivacy;
