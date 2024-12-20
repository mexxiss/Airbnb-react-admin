import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormikContext } from "formik";
import classNames from "classnames";
interface CheckboxProps {
  name: string; // The field name to store the selected values
  label: string;
  value: string; // The id of the checkbox (amenity id)
  icon: string; // Path to the icon image for the checkbox
  labelClass?: string; // Custom label class
  inputClass?: string; // Custom input class
  containerClass?: string; // Custom container class
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CheckboxHiddenInput: React.FC<CheckboxProps> = ({
  name,
  label,
  value,
  icon,
  labelClass,
  inputClass,
  containerClass,
}) => {
  console.log({ value, label });

  const { setFieldValue, values } = useFormikContext<{ [key: string]: any }>();

  const isChecked = values[name]?.includes(value) || false;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    const updatedValues = checked
      ? [...(values[name] || []), value] // Add the id if checked
      : (values[name] || []).filter((item: string) => item !== value); // Remove the id if unchecked

    setFieldValue(name, updatedValues);
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<img src={icon} alt={label} className="grayImg w-4 h-4" />}
      sx={
        isChecked
          ? {
              backgroundColor: "transparent",
              borderColor: "#707070",
              color: "#707070",
            }
          : {
              backgroundColor: "#f0cc8d8a",
              borderColor: "#bb9e6c",
              color: "#707070",
            }
      }
    >
      {label}
      <VisuallyHiddenInput
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={classNames(inputClass)}
      />
    </Button>
  );
};
