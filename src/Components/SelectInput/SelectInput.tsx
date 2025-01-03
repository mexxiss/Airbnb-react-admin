import React from "react";
import Select from "react-select";
import { useFormikContext, getIn } from "formik";

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

const SelectInput: React.FC<SelectInputProps> = ({
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

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      // For multi-select, save an array of selected values
      setFieldValue(
        name,
        selectedOption ? selectedOption?.map((opt: any) => opt.value) : []
      );
    } else {
      // For single-select, save the value
      setFieldValue(name, selectedOption ? selectedOption.value : "");
    }
  };

  const getSelectedValue = () => {
    if (isMulti) {
      return options?.filter((option) => fieldValue?.includes(option.value)); // Match selected values for multi-select
    }
    return options?.find((option) => option.value === fieldValue) || null; // Match selected value for single-select
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
      {errorMessage && (
        <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default SelectInput;

{
  /* <SelectInput
label="Multi Select"
name="multiSelect"
options={multiOptions}
isMulti
placeholder="Choose multiple options"
className="mb-4"
/> */
}
