import React from "react";
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

const Checkbox: React.FC<CheckboxProps> = ({
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
    <div className={classNames("min-w-24", containerClass)}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={classNames("form-checkbox hidden", inputClass)}
      />

      <label
        htmlFor={value}
        className={classNames(
          "w-full text-center h-[45px] text-[#707070] py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070]",
          {
            "bg-blue-500 text-white": isChecked, // Apply active styles when selected
            "bg-white text-[#707070]": !isChecked, // Apply inactive styles when deselected
          },
          labelClass
        )}
      >
        <img src={icon} alt={label} className="grayImg w-4 h-4" />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
