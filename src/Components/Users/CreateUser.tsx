import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import NewUser from "./components/NewUser";
import { Link } from "react-router-dom";

const CreateUser = () => {
  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">

        <div className="flex items-center border-b border-primary pb-5 mb-5 gap-3">
          <Link to="/admin/users">
            <KeyboardArrowLeftOutlined />
          </Link>
          <h5 className="text-22 text-primary font-bold">New User</h5>
        </div>
        {/* New User form */}
        <NewUser />
      </div>
    </div>
  );
};

export default CreateUser;
