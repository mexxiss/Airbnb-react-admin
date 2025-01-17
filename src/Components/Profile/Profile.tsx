import userImg2 from "../../assets/images/userImg2.png";
import { EditOutlined } from "@mui/icons-material";
import { Form, FormikProvider, useFormik } from "formik";
import Input from "../Input/Input";

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      dateOfBirth: '',
      about: ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);

    }
  })
  return (
    <div>
      <div className=" px-6 pt-6 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <h5 className="text-22 text-primary font-bold mb-5">Profile</h5>
        <div>
          <div className="lg:mt-6 flex items-center justify-between">
            <p className="text-lg font-medium">Edit Profile</p>
            <div className="flex items-center gap-4">
              <button type="button" className="border border-red-600 text-red-600 h-9 sm:h-10 px-4 sm:px-10 rounded-lg hover:bg-red-600 hover:text-white duration-300">
                Discard
              </button>
              <button type="submit" className="border border-primary bg-primary text-white h-9 sm:h-10 px-4 sm:px-10 rounded-lg hover:bg-[#00858ed1] duration-300">
                Save
              </button>
            </div>
          </div><div className="mt-6 grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <div className="bg-[#F7F7F7] rounded-2xl py-4 px-4 shadow">
                <div className="flex flex-col xs:flex-row item-center gap-3 xs:gap-6">
                  <div>
                    <div className="w-max mx-auto flex items-center justify-center xs:block relative cursor-pointer">
                      <img
                        src={userImg2}
                        className="min-w-20 w-20 h-20 rounded-full object-cover"
                        alt=""
                      />
                      <input
                        type="file"
                        // id="addPhotos"
                        className="hidden"
                      />
                      <span className="absolute bottom-0 -right-2"><EditOutlined /></span>
                    </div>
                  </div>
                  <div className="xs:self-center text-center xs:text-start">
                    <p className="text-xl font-medium text-[#1D1A22] mb-1">
                      Inder
                    </p>
                    <p className="text-[#77767A]">inder@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="bg-[#F7F7F7] rounded-2xl py-4 px-4 shadow">
                <p className="text-lg font-medium">Personal Information</p>
                <div className="mt-3.5">
                </div >
                {/* <form> */}
                <FormikProvider value={formik}>
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
                </FormikProvider>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile