import React from "react";

interface InfoCardProps {
  count: number | string;
  label: string;
  icon: string; // Icon image source
  bgColor?: string; // Background color of the card
  iconBgColor?: string; // Background color of the icon container
  textColor?: string; // Text color
  filter?: string; // CSS filter for dynamic color change
}

const InfoCard: React.FC<InfoCardProps> = ({
  count,
  label,
  icon,
  bgColor = "#a58b5e",
  iconBgColor = "#ffffff",
  textColor = "#ffffff",
  filter = "invert(37%) sepia(37%) saturate(2195%) hue-rotate(3deg) brightness(80%) contrast(60%)",
}) => {
  return (
    <div
      className={`w-full xs:flex-1 rounded-2xl p-4 flex xs:block gap-4 items-center`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="xs:w-[34px] w-12 h-12 xs:h-[34px] rounded-[10px] flex items-center justify-center xs:mb-3.5"
        style={{ backgroundColor: iconBgColor }}
      >
        <img src={icon} alt={label} className="w-6 xs:w-4" style={{ filter }} />
      </div>
      <div>
        <p className="text-2xl font-medium" style={{ color: textColor }}>
          {count}
        </p>
        <p className="text-xs" style={{ color: textColor }}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
