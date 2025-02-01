import { FormikProvider, useFormik } from "formik";
import { Form } from "react-router-dom";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { useFetchLegals } from "../../hooks/react-query/legals";
import { useMutateUpdateLegals } from "../../hooks/react-query/legals/useMutateUpdateLegals";
import { legalContentValidationSchema } from "../../utils/validations/legalsValidations";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import Input from "../Input/Input";

const WebsiteRefund = () => {

    const { data, error, isError, isLoading } = useFetchLegals({
        type: "refund",
    });

    const { mutate: createUpdateLegals, isPending } = useMutateUpdateLegals();

    const formik = useFormik({
        initialValues: {
            title: data?.data.title || "",
            body: data?.data.body || "",
            type: "refund",
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
                                <div className="sm:col-span-2 ">
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
                                    {/* <button className="btn1 !bg-transparent border border-primary !text-primary hover:bg-primary hover:text-white flex items-center justify-center">
                                        Preview
                                    </button> */}
                                </div>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    );
};

export default WebsiteRefund;
