import React from "react";
import { Tooltip } from "@mui/material"; // Replace with your Tooltip library if different

interface EllipsisTooltipProps {
  placement?:
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start";
  title: string;
  width?: string;
  className?: string;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  title,
  width = "200px",
  className = "",
  placement = "top",
}) => {
  return (
    <Tooltip title={title} placement={placement}>
      <p
        className={`text-nowrap text-ellipsis overflow-hidden ${className}`}
        style={{ width }}
      >
        {title}
      </p>
    </Tooltip>
  );
};

export default EllipsisTooltip;
