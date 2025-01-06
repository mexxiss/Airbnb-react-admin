import React from "react";
import { IconButton } from "@mui/material";

interface ActionButtonProps {
  icons: {
    icon: React.ReactElement;
    onClick?: () => void;
    xs?: number;
    sm?: number;
  }[];
  gap?: string | number;
}

const ActionButtonGroup: React.FC<ActionButtonProps> = ({ icons, gap = 1 }) => {
  return (
    <div
      className="flex"
      style={{ gap: typeof gap === "number" ? `${gap}px` : gap }}
    >
      {icons.map((iconConfig, index) => (
        <IconButton
          key={index}
          sx={{ p: { xs: 0, sm: 0.5 } }}
          onClick={iconConfig.onClick}
        >
          {React.cloneElement(iconConfig.icon, {
            sx: {
              fontSize: { xs: iconConfig.xs || 14, sm: iconConfig.sm || 18 },
            },
          })}
        </IconButton>
      ))}
    </div>
  );
};

export default ActionButtonGroup;
