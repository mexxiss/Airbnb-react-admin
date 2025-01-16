import { useState } from "react";
import searchIcon from "../../assets/icons/searchIcon.png";
import { Accordion, Modal } from "flowbite-react";
import { CloseOutlined } from "@mui/icons-material";
import { pageArrs } from "./utils/mock/static";
import CustomSelectInput from "../SelectInput/CustomSelectInput";
import { useFormik } from "formik";
import { faqValidationSchema } from "../../utils/validations/faqValidation";
import { useCreateFaq } from "../../hooks/react-query/faqs/useCreateFaq";

const Faq = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: createFaq, isPending } = useCreateFaq();
  const options = pageArrs.map((page) => ({
    value: page,
    label: page.charAt(0).toUpperCase() + page.slice(1),
  }));

  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      page: [] as string[],
    },
    validationSchema: faqValidationSchema,
    onSubmit: (values) => {
      createFaq(values, {
        onSuccess: () => {
          setOpenModal(false);
          formik.resetForm();
        },
        onError: (error) => {
          console.error(error);
        },
      });
    },
  });

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
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
            <button
              className="text-sm py-2 px-5 rounded-full text-white border border-primary bg-primary hover:bg-[#00858ed0] duration-300"
              onClick={() => setOpenModal(true)}
            >
              Add FAQ
            </button>
          </div>
        </div>
        <div>
          <Accordion collapseAll>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Accordion.Panel key={index}>
                  <Accordion.Title className="bg-white hover:bg-white py-4 px-3">
                    What is Flowbite?
                  </Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive
                      components built on top of Tailwind CSS including buttons,
                      dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to&nbsp;
                      <a
                        href="https://flowbite.com/docs/getting-started/introduction/"
                        className="text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        get started&nbsp;
                      </a>
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
          </Accordion>
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="flex items-center justify-between">
            <h6 className="text-xl text-primary font-bold">ADD FAQ</h6>
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
                  <h2 className="text-xl font-bold mb-4">Select Pages</h2>
                  <CustomSelectInput
                    label="Pages"
                    options={options}
                    isMulti={true}
                    value={formik.values.page}
                    onChange={(value) =>
                      formik.setFieldValue(
                        "page",
                        Array.isArray(value) ? value : [value]
                      )
                    }
                    placeholder="Select pages"
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
                    {isPending ? "Saving..." : "SAVE"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Faq;
