import React from "react";
import { useFormikContext, getIn } from "formik";
import { Label, Select } from "flowbite-react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  options: SelectOption[]; // Options for the select dropdown
  isMulti?: boolean; // Enable multi-select
  className?: string;
  placeholder?: string;
}

const SelectInputFlowbit: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  isMulti = false,
  className = "",
  placeholder = "Select an option",
}) => {
  const { values, setFieldValue, errors } = useFormikContext<any>();

  // Formik value for the field
  const fieldValue = getIn(values, name);

  // Formik error and touched status
  const errorMessage = getIn(errors, name);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (isMulti) {
      const newValues = fieldValue
        ? [...fieldValue, selectedValue]
        : [selectedValue];
      setFieldValue(name, newValues);
    } else {
      setFieldValue(name, selectedValue);
    }
  };

  const getSelectedValue = () => {
    if (isMulti) {
      return fieldValue || [];
    }
    return fieldValue || "";
  };

  return (
    <div className={className}>
      <Label htmlFor={name} className="text-[15px] block mb-2 font-medium">
        {label}
      </Label>
      <Select
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
      {errorMessage && (
        <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default SelectInputFlowbit;
