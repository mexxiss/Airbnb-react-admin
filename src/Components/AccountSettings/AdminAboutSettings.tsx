import { MenuOutlined } from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";
import { Form } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import { useFetchLegals } from "../../hooks/react-query/legals/useFetchLegals";
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
interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const AdminAboutSettings = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

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
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">About Us</h5>
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
                <div className="sm:col-span-2"></div>
              </div>
              <div className="">
                <ReactQuillInput
                  minHeight="150px"
                  name="body"
                  placeholder="About Us..."
                />
              </div>
              <div>
                <label>Images</label>
                <ImageUpload name="images" formik={formik} />
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

export default AdminAboutSettings;
