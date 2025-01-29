import { Modal } from "flowbite-react"
import { CloseOutlined } from "@mui/icons-material";
import { Query } from "../../types/contactQueries";
import { Form, FormikProvider, useFormik } from "formik";
import { usePutContactQuery } from "../../hooks/react-query/contact-support/usePutContactQuery";
import { showToast } from "../../utils/toaster/toastWrapper";
import useUserContactQueriesStore from "../../store/useUserContactQueriesStore";
import { contactQuerySchema } from "../../utils/validations/legalsValidations";

interface IProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    query?: Query | null;
}

const ContactSupportReply = ({ showModal, setShowModal, query }: IProps) => {
    const replyMutation = usePutContactQuery();
    const { updateQuery } = useUserContactQueriesStore();

    const initialValues = {
        reply: query?.reply || "",
        status: "Replied"
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: contactQuerySchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (query?._id) {
                replyMutation.mutate(
                    { id: query._id, updates: values },
                    {
                        onSuccess: () => {
                            updateQuery({ ...query, ...values })
                            setShowModal(false)
                        }
                    }
                );
            } else {
                showToast("error", "Query not selected");
            }
        },
    });

    return (
        <div>
            <Modal show={showModal} onClose={() => setShowModal(false)} className="!p-0">
                <Modal.Body className="!p-0">
                    <div className="flex items-center justify-between px-5 py-3">
                        <h6 className="text-lg font-medium text-primary">
                            Reply
                        </h6>
                        <button onClick={() => setShowModal(false)}>
                            <CloseOutlined className="!text-lg" />
                        </button>
                    </div>
                    <div className="px-5 py-4 border-t">
                        <FormikProvider value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <div>
                                    <p className="text-sm lg:text-base text-text3">
                                        <span className="text-text1 font-medium">Type:</span> {query?.question_type}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm lg:text-base text-text3">
                                        <span className="text-text1 font-medium">Question:</span> {query?.message}
                                    </p>
                                </div>
                                <div className="mt-5">
                                    <textarea
                                        name="reply"
                                        value={formik.values.reply}
                                        onChange={formik.handleChange}
                                        className="border-2 border-[#E8E1F6] rounded-lg w-full py-2 px-3 resize-none"
                                        placeholder="Write your reply..."
                                        rows={3}
                                        disabled={(query?.reply !== "" && query?.reply !== undefined && query?.reply !== null) ? true : false}
                                    />
                                    {formik.touched.reply && formik.errors.reply ? (
                                        <div className="text-red-600">{formik.errors.reply}</div>
                                    ) : null}
                                </div>
                                {(query?.reply === "" || query?.reply === undefined || query?.reply === null) &&
                                    <div className="mt-2 text-end">
                                        <button type="submit"
                                            className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                        >
                                            {replyMutation.status === 'pending' ? "Submitting" : "Submit"}
                                        </button>
                                    </div>
                                }
                            </Form>
                        </FormikProvider>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default ContactSupportReply