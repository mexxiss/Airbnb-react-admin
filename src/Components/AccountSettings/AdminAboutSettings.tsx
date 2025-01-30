import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { Form } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import {
  useFetchAboutData,
  useUpateAndCreateAbout,
} from "../../hooks/react-query/legals";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import { validationSchemaAbout } from "../../utils/validations/legalsValidations";
import { uploadFile } from "../../services/apiServices";
import ImageUpload from "../ImageUpload/ImageUpload";
import Input from "../Input/Input";
interface FormValues {
  title: string;
  body: string;
  images: string[];
}
const AdminAboutSettings = () => {
  const { data, error, isError, isLoading } = useFetchAboutData();
  const { mutate: createUpdateAbout, isPending } = useUpateAndCreateAbout();

  const initialValues: FormValues = {
    title: data?.title || "",
    body: data?.body || "",
    images: data?.images || [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaAbout,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const uploadedImages: string[] = [];
      const existingImages = values.images.filter((img: any) => !img.isNew);

      // Upload new images
      const newImages = values.images.filter(
        (img: any) => img.isNew && img.file
      );
      console.log({ newImages });

      for (const img of newImages) {
        const { file } = img;
        try {
          const uploaded = await uploadFile("aboutPage", file);
          uploadedImages.push(uploaded.imageUrl);
        } catch (err) {
          console.error("Upload failed:", err);
        }
      }

      // Combine new and existing images
      const finalImages = [...existingImages, ...uploadedImages];

      // Prepare data for submission
      const formData = {
        title: values.title,
        body: values.body,
        images: finalImages,
      };
      createUpdateAbout(formData);
    },
  });

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="flex items-center justify-between border-b border-primary pb-5 mb-5">
          <h5 className="text-22 text-primary font-bold">About Us</h5>
        </div>
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
                <div className="sm:col-span-2"></div>
              </div>
              <div className="">
                <ReactQuillInput
                  minHeight="150px"
                  name="body"
                  placeholder="About Us..."
                />
              </div>
              <div className="mt-5">
                <label className="font-medium text-lg mb-2 inline-block">
                  Images
                </label>
                <ImageUpload name="images" formik={formik} />
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <button
                  className="btn1 flex items-center justify-center"
                  type="submit"
                >
                  {isPending ? "Saving.." : "Save"}
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutSettings;
