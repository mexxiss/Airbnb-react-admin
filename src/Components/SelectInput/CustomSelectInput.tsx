import React, { useState } from "react";
import Select from "react-select";

interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectInputProps {
  label: string;
  name?: string;
  options: SelectOption[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  value?: string | number | (string | number)[]; // Selected value(s)
  onChange?: (value: string | number | (string | number)[]) => void; // Change handler
  error?: string; // Error message for validation
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
  label,
  name,
  options,
  isMulti = false,
  className = "",
  placeholder = "Select an option",
  value,
  onChange,
  error,
}) => {
  const [internalValue, setInternalValue] = useState<
    string | number | (string | number)[]
  >(value || (isMulti ? [] : ""));

  const handleChange = (selectedOption: any) => {
    const newValue = isMulti
      ? selectedOption
        ? selectedOption.map((opt: any) => opt.value)
        : []
      : selectedOption
      ? selectedOption.value
      : "";

    setInternalValue(newValue);

    if (onChange) {
      onChange(newValue); // Notify parent component of the change
    }
  };

  const getSelectedValue = () => {
    if (isMulti) {
      return options?.filter((option) =>
        Array.isArray(internalValue) ? internalValue.includes(option.value) : []
      );
    }
    return options?.find((option) => option.value === internalValue) || null;
  };

  return (
    <div className={className}>
      <label className="text-[15px] block mb-2 font-medium">{label}</label>
      <Select
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
        value={getSelectedValue()}
        onChange={handleChange}
        classNamePrefix="react-select"
      />
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default CustomSelectInput;
