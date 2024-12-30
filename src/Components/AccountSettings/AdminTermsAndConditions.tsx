import { MenuOutlined } from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import { FormikProvider, useFormik } from "formik";
import { Form } from "react-router-dom";
import ReactQuillInput from "../ReactQuillInput/ReactQuillInput";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const AdminTermsAndConditions = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;
  const formik = useFormik({
    initialValues: {
      terms: "",
    },
    // validationSchema: validationPropertyDetailSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
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
          <h5 className="text-22 text-primary font-bold">Terms & Conditions</h5>
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
              <div className="">
                <ReactQuillInput
                  name="terms"
                  minHeight="150px"
                  placeholder="Terms & Conditions..."
                />
                <div className="flex justify-end mt-6 gap-3">
                  <button className="btn1 flex items-center justify-center">
                    Save
                  </button>
                  <button className="btn1 !bg-transparent border border-primary !text-primary hover:bg-primary hover:text-white flex items-center justify-center">
                    Preview
                  </button>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminTermsAndConditions;
