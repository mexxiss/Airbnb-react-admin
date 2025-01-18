import userImg2 from "../../assets/images/userImg2.png";
import { EditOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import Input from "../Input/Input";
import { useUpdateDetails } from "../../hooks/react-query/users-queries/useUpdateDetails";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useUploadFile } from "../../hooks/react-query/upload-files/useUploadFile";
import { validationSchemaUserUpdate } from "../UI/PhoneInput/validationSchemaUserUpdate";
import { PhoneFieldArray } from "../UI/PhoneInput/PhoneFieldArray";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setUser, user } = useAuthStore();

  const { mutate: updateUser, isPending } = useUpdateDetails();
  const { mutate: uploadFile, isPending: isPendingUpload } = useUploadFile();

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || [],
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const handleSubmitData = async () => {
    try {
      if (selectedFile) {
        uploadFile(
          {
            folder: "update-profile",
            file: selectedFile,
          },
          {
            onSuccess: (data) => {
              const dataUrl = { data: { profile_img: data?.imageUrl } };
              updateUser(dataUrl, {
                onSuccess: (data) => {
                  setUser({ ...user, ...data?.data });
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                },
              });
            },
          }
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const modifiedData = { data: { ...values } };
      updateUser(modifiedData, {
        onSuccess: (data) => {
          setUser({ ...user, ...data?.data });
          setPreviewUrl(null);
          setSelectedFile(null);
          setPreviewUrl(null);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" px-6 pt-6 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <h5 className="text-22 text-primary font-bold mb-5">Profile</h5>
        <div>
          <div className="lg:mt-6 flex items-center justify-between">
            <p className="text-lg font-medium">Edit Profile</p>
            {/* <div className="flex items-center gap-4">
              <button
                onClick={handleSubmitData}
                className="border border-primary bg-primary text-white h-9 sm:h-10 px-4 sm:px-10 rounded-lg hover:bg-[#00858ed1] duration-300"
              >
                {isPendingUpload || isPending ? "Saving..." : "Save"}
              </button>
            </div> */}
          </div>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <div className="bg-[#F7F7F7] rounded-2xl py-4 px-4 shadow">
                <div className="flex flex-col xs:flex-row item-center gap-3 xs:gap-6">
                  <div>
                    <div className="w-max mx-auto flex items-center justify-center xs:block relative cursor-pointer">
                      <img
                        src={previewUrl || user?.profile_img || userImg2}
                        className="min-w-20 w-20 h-20 rounded-full object-cover"
                        alt=""
                      />
                      <input
                        type="file"
                        id="addPhotos"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="addPhotos"
                        className="absolute bottom-0 -right-2 cursor-pointer"
                      >
                        <EditOutlined />
                      </label>
                    </div>
                  </div>
                  <div className="xs:self-center text-center xs:text-start">
                    <p className="text-xl font-medium text-[#1D1A22] mb-1">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-[#77767A]">{user?.email[0]}</p>
                  </div>
                  {selectedFile && (
                    <div className="xs:self-center text-center xs:text-start">
                      <button
                        onClick={handleSubmitData}
                        className="border border-primary bg-primary text-white h-9 sm:h-10 px-4 sm:px-10 rounded-lg hover:bg-[#00858ed1] duration-300"
                      >
                        {isPendingUpload || isPending
                          ? "Image Saving..."
                          : "Image Save"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-[#F7F7F7] rounded-2xl py-4 px-4 shadow">
                <p className="text-lg font-medium">Personal Information</p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchemaUserUpdate}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-5">
                        <Input
                          name="first_name"
                          placeholder="Enter name"
                          type="text"
                          label="First Name"
                          labelClass="text-[#77767A] "
                        />
                      </div>
                      <div className="mb-5">
                        <Input
                          name="last_name"
                          placeholder="Enter name"
                          type="text"
                          label="Last Name"
                          labelClass="text-[#77767A] "
                        />
                      </div>
                      <div className="mb-5">
                        <Input
                          name="email"
                          placeholder="Email address"
                          type="text"
                          label="Email address"
                          labelClass="text-[#77767A] "
                          disabled={true}
                          value={user?.email[0] || ""}
                        />
                      </div>
                      <PhoneFieldArray name="phone" label="Phone Number" />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full border border-primary bg-primary text-white h-9 sm:h-10 px-4 sm:px-10 rounded-lg hover:bg-[#00858ed1] duration-300"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
                <div className="mt-3.5"></div>

                {/* <FormikProvider value={formik}>
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="mb-5">
                      <Input
                        name="Name"
                        placeholder="Enter name"
                        type="text"
                        label="Enter Name"
                        labelClass="text-[#77767A] "
                      />
                    </div>

                    <div className="mb-5">
                      <Input
                        name="Email"
                        placeholder="Email address"
                        type="text"
                        label="Email address"
                        labelClass="text-[#77767A] "
                        disabled={true}
                      />
                    </div>
                    <div className="mb-5">
                      <Input
                        name="DOB"
                        placeholder="Date of Birth"
                        type="date"
                        label="Date of Birth"
                        labelClass="text-[#77767A] "
                      />
                    </div>
                  </Form>
                </FormikProvider> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
