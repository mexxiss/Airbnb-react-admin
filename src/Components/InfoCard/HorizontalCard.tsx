import React from "react";

interface HorizontalCardProps {
  icon: string; // Path to the icon
  count: number | string; // Dynamic count
  label: string; // Description or label
  bgColor?: string; // Background color of the card
  iconBgColor?: string; // Background color of the icon container
  textColor?: string; // Text color
  filter?: string; // CSS filter for icon customization
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  icon,
  count,
  label,
  bgColor = "#a58b5e", // Default background color
  iconBgColor = "#ffffff", // Default icon background color
  textColor = "#ffffff", // Default text color
  filter = "none", // Default filter
}) => {
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: bgColor }}>
      {/* Icon Container */}
      <div
        className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center mb-3.5"
        style={{ backgroundColor: iconBgColor }}
      >
        <img src={icon} alt={label} className="w-6 lg:w-4" style={{ filter }} />
      </div>

      {/* Content Section */}
      <div>
        <p
          className="text-2xl lg:text-3xl font-medium"
          style={{ color: textColor }}
        >
          {count}
        </p>
        <p className="text-sm mt-2" style={{ color: textColor }}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default HorizontalCard;
