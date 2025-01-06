import { MenuOutlined } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

interface ComponentHeaderProps {
  title: string;
  linkText: string;
  linkTo: string;
  userImage: string;
  onMenuClick: () => void;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  title,
  linkText,
  linkTo,
  userImage,
  onMenuClick,
}) => {
  return (
    <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden hover:text-primary active:text-primary"
          onClick={onMenuClick}
        >
          <MenuOutlined className="!text-3xl" />
        </button>
        <h5 className="text-22 text-primary font-bold">{title}</h5>
      </div>
      <div className="flex items-center gap-6">
        <Link to={linkTo} className="text-22 text-primary">
          {linkText}
        </Link>
        <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
          <img
            src={userImage}
            className="w-full h-full object-cover"
            alt="User"
          />
        </button>
      </div>
    </div>
  );
};

export default ComponentHeader;
