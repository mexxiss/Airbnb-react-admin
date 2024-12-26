import React, { useState } from "react";
import { Label, Select } from "flowbite-react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  options: SelectOption[];
  isMulti?: boolean;
  islableVisible?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (name: string, value: string | string[]) => void; // Callback to handle changes
  value?: string | string[]; // External value for controlled input
  error?: string; // Error message
}

const SelectInputFlowbitWithoutFormik: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  isMulti = false,
  className = "",
  placeholder = "Select an option",
  onChange,
  value = isMulti ? [] : "",
  error,
  islableVisible = true,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    let newValue: string | string[];
    if (isMulti) {
      newValue = Array.isArray(internalValue)
        ? [...internalValue, selectedValue]
        : [selectedValue];
    } else {
      newValue = selectedValue;
    }

    setInternalValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  const getSelectedValue = () => {
    if (isMulti) {
      return Array.isArray(internalValue) ? internalValue : [];
    }
    return typeof internalValue === "string" ? internalValue : "";
  };

  return (
    <div className={className}>
      {islableVisible && (
        <Label htmlFor={name} className="text-[15px] block mb-2 font-medium">
          {label}
        </Label>
      )}
      <Select
        className="focuse:!ring-0"
        id={name}
        name={name}
        multiple={isMulti}
        value={getSelectedValue()}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default SelectInputFlowbitWithoutFormik;
