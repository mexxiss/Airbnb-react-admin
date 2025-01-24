import { useState } from "react";
import searchIcon from "../../assets/icons/searchIcon.png";
import { Accordion, Modal } from "flowbite-react";
import {
  CloseOutlined,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import { pageArrs } from "./utils/mock/static";
import CustomSelectInput from "../SelectInput/CustomSelectInput";
import { useFormik } from "formik";
import { faqValidationSchema } from "../../utils/validations/faqValidation";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { useFetchFaqs } from "../../hooks/react-query/faqs/useFetchFaqs";
import {
  useCreateFaq,
  useDeleteFaq,
  useUpdateFaq,
} from "../../hooks/react-query/faqs";
import { FaqProps } from "../../types/faqTypes";
import { showConfirmationDialog } from "../../utils/alerts/alertService";

const Faq = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editable, setEditable] = useState<FaqProps | undefined>(undefined);

  const { mutate: createFaq, isPending: isCreating } = useCreateFaq();
  const { mutate: updateFaq, isPending: isUpdating } = useUpdateFaq();
  const { mutate: deleteFaq, isPending: isdeleteFaq } = useDeleteFaq();

  const options = pageArrs.map((page) => ({
    value: page,
    label: page.charAt(0).toUpperCase() + page.slice(1),
  }));

  const [isActive, setIsActive] = useState(pageArrs[0]);
  const {
    data: faqRespData,
    isLoading: isFetching,
    error,
    isError,
    refetch,
  } = useFetchFaqs(isActive);

  const formik = useFormik({
    initialValues: {
      question: editable?.question || "",
      answer: editable?.answer || "",
      page: editable?.page || ([] as string[]),
    },
    enableReinitialize: true,
    validationSchema: faqValidationSchema,
    onSubmit: (values) => {
      if (editable) {
        updateFaq(
          { id: editable._id, faq: values },
          {
            onSuccess: () => {
              setOpenModal(false);
              setEditable(undefined);
              formik.resetForm();
            },
            onError: (error) => {
              console.error("Error updating FAQ:", error);
            },
          }
        );
      } else {
        // Create new FAQ
        createFaq(values, {
          onSuccess: () => {
            setOpenModal(false);
            formik.resetForm();
          },
          onError: (error) => {
            console.error("Error creating FAQ:", error);
          },
        });
      }
    },
  });

  const handleFaqEditClick = (id: string) => {
    const faqToEdit = faqRespData?.data?.find((value) => id === value._id);
    if (faqToEdit) {
      setEditable(faqToEdit);
      setOpenModal(true);
    }
  };

  const handleFaqCreateClick = () => {
    setEditable(undefined);
    setOpenModal(true);
  };

  const handleDeleteFaq = async (id: string) => {
    const isConfirmed = await showConfirmationDialog(
      "Are you sure?",
      "Do you really want to delete this FAQ? This action cannot be undone.",
      "Delete",
      "Cancel",
      {
        popup: "bg-white shadow-xl p-8",
        title: "text-red-600 font-semibold text-xl",
        confirmButton: "bg-primary text-white py-2 px-4 rounded",
        cancelButton: "bg-gray-400 text-white py-2 px-4 rounded",
      }
    );

    if (isConfirmed) {
      deleteFaq(id, {
        onSuccess: () => {
          console.log("FAQ deleted successfully.");
          refetch();
        },
        onError: (error) => {
          console.error("Error deleting FAQ:", error);
        },
      });
    } else {
      console.log("Delete action cancelled.");
    }
  };
  return (
    <DataHandler
      loadingStates={[isFetching]}
      errorStates={[{ isError, error }]}
    >
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="flex items-center justify-between border-b border-[#00858e5e] pb-5 mb-5">
          <h5 className="text-22 text-primary font-bold">FAQs</h5>
          <div className="flex items-center gap-3">
            <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5">
              <input
                type="text"
                placeholder="Search"
                className="p-0 placeholder:text-[#4E307A80] text-[#4E307A80] text-sm border-none lg:min-w-[350px]"
              />
              <img
                src={searchIcon}
                className="w-4 brightness-75 absolute left-4 top-1/2 -translate-y-1/2"
                alt=""
              />
            </div>
            {
              <button
                className="text-sm py-2 px-5 rounded-full text-white border border-primary bg-primary hover:bg-[#00858ed0] duration-300"
                onClick={() => handleFaqCreateClick()}
              >
                Add FAQ
              </button>
            }
          </div>
        </div>
        <div className="mb-6">
          <ul className="flex flex-wrap gap-2 overflow-x-auto pb-3">
            {pageArrs.map((e) => (
              <li
                className={`capitalize text-sm text-nowrap py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
                  isActive === e
                    ? " bg-[#1E1E1E] border-[#1E1E1E] text-white"
                    : "border-border1 text-text2"
                }`}
                onClick={() => setIsActive(e)}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Accordion collapseAll className="!border-none">
            {faqRespData?.data?.length ? (
              faqRespData.data.map((data) => (
                <Accordion.Panel key={data._id} className="!border-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-full">
                      <Accordion.Title className="bg-white hover:bg-white py-4 px-3 !border-none">
                        {data.question}
                      </Accordion.Title>
                      <Accordion.Content className="!border-none">
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                          {data.answer}
                        </p>
                      </Accordion.Content>
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                      <button
                        className="hover:text-green-600 duration-300"
                        onClick={() => handleFaqEditClick(data._id)}
                      >
                        <EditOutlined className="!text-xl" />
                      </button>
                      <button
                        className="hover:text-red-600 duration-300"
                        onClick={() => handleDeleteFaq(data._id)}
                      >
                        <DeleteOutline className="!text-xl" />
                      </button>
                    </div>
                  </div>
                </Accordion.Panel>
              ))
            ) : (
              <Accordion.Panel className="!border-none">
                <Accordion.Content className="!border-none">
                  <p className="text-gray-500 dark:text-gray-400">
                    No FAQs available.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            )}
          </Accordion>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="flex items-center justify-between">
            <h6 className="text-xl text-primary font-bold">{`${
              editable ? "Edit" : "ADD"
            } FAQ`}</h6>
            <button
              className="flex items-center justify-center"
              onClick={() => setOpenModal(false)}
            >
              <CloseOutlined className="!text-xl" />
            </button>
          </div>
          <div className="mt-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <CustomSelectInput
                    label="Select Page"
                    options={options}
                    isMulti={true}
                    value={formik.values.page}
                    onChange={(value) =>
                      formik.setFieldValue(
                        "page",
                        Array.isArray(value) ? value : [value]
                      )
                    }
                    placeholder="Select page"
                    error={
                      formik.touched.page &&
                      typeof formik.errors.page === "string"
                        ? formik.errors.page
                        : undefined
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="question">Question</label>
                  <input
                    id="question"
                    name="question"
                    type="text"
                    className="rounded"
                    placeholder="Write Question"
                    value={formik.values.question}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.question && formik.errors.question && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.question}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="answer">Answer</label>
                  <textarea
                    id="answer"
                    name="answer"
                    rows={4}
                    className="resize-none rounded"
                    placeholder="Write Answer"
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.answer && formik.errors.answer && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.answer}
                    </p>
                  )}
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="text-sm py-2 px-6 rounded-full text-white border border-primary bg-primary hover:bg-[#00858ed0] duration-300"
                  >
                    {isCreating || isUpdating ? "Saving..." : "SAVE"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </DataHandler>
  );
};

export default Faq;
