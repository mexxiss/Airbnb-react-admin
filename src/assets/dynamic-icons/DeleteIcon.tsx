import React from "react";

interface IconProps {
  size?: number; // Size of the icon (width and height)
  color?: string; // Fill color of the icon
  className?: string; // Additional CSS classes for styling
}

const DeleteIcon: React.FC<IconProps> = ({
  size = 16,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2C6 1.44772 6.44772 1 7 1H13C13.5523 1 14 1.44772 14 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H3C2.44772 4 2 3.55228 2 3C2 2.44772 2.44772 2 3 2H6ZM4 6H16L15.2764 16.1684C15.211 16.9497 14.5516 17.5 13.7656 17.5H6.23438C5.44839 17.5 4.78895 16.9497 4.72355 16.1684L4 6ZM7.5 8C7.22386 8 7 8.22386 7 8.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V8.5C8 8.22386 7.77614 8 7.5 8ZM12.5 8C12.2239 8 12 8.22386 12 8.5V14.5C12 14.7761 12.2239 15 12.5 15C12.7761 15 13 14.7761 13 14.5V8.5C13 8.22386 12.7761 8 12.5 8Z" />
    </svg>
  );
};

export default DeleteIcon;
