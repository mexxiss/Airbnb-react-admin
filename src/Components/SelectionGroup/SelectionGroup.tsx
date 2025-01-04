import React from "react";
import { User } from "../../types/usersTypes";
import { useSelection } from "../../hooks/custom-hook/useSelection";
import CustomSelectInput from "../SelectInput/CustomSelectInput";
import MonthPicker from "../DateInput/MonthPicker";

interface SelectionGroupProps {
  onUserChange?: (value: string | number | (string | number)[]) => void;
  onPropertyChange?: (value: string | number | (string | number)[]) => void;
  onMonthChange?: (value: string) => void;
  onSelectedUserChange?: (user: User | null) => void;
  className?: string;
}

export const SelectionGroup: React.FC<SelectionGroupProps> = ({
  onUserChange,
  onPropertyChange,
  onMonthChange,
  onSelectedUserChange,
  className = "",
}) => {
  const {
    selectedValue,
    selectedProperty,
    selectedMonth,
    selectedUser,
    userData,
    propertyDataModified,
    handleChange,
    handleChangeProperty,
    handleMonthChange,
  } = useSelection();

  // Notify parent component when selectedUser changes
  React.useEffect(() => {
    onSelectedUserChange?.(selectedUser);
  }, [selectedUser, onSelectedUserChange]);

  const handleUserSelection = (
    value: string | number | (string | number)[]
  ) => {
    handleChange(value);
    onUserChange?.(value);
  };

  const handlePropertySelection = (
    value: string | number | (string | number)[]
  ) => {
    handleChangeProperty(value);
    onPropertyChange?.(value);
  };

  const handleMonthSelection = (value: string) => {
    handleMonthChange(value);
    onMonthChange?.(value);
  };

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <CustomSelectInput
        label="Select User"
        options={userData}
        value={selectedValue}
        onChange={handleUserSelection}
        placeholder="Select an option"
        className="mb-4"
        error={!selectedValue ? "This field is required" : ""}
      />

      <CustomSelectInput
        label="Select Property"
        options={propertyDataModified}
        value={selectedProperty}
        onChange={handlePropertySelection}
        placeholder="Select an option"
        className="mb-4"
        error={!selectedProperty ? "This field is required" : ""}
      />

      <MonthPicker
        label="Select a Month"
        value={selectedMonth}
        onChange={handleMonthSelection}
      />
    </div>
  );
};
