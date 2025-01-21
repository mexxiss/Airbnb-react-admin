import React, { useEffect, useState } from "react";
import { useFormikContext, getIn } from "formik";

interface DateInputProps {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  minDate?: string; // Minimum allowed date in "YYYY-MM-DD" format
  maxDate?: string; // Maximum allowed date in "YYYY-MM-DD" format
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  className = "",
  placeholder = "Select a date",
  minDate,
  maxDate,
}) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  const [dateValue, setDateValue] = useState<string>("");

  useEffect(() => {
    // Convert ISO date format to "YYYY-MM-DD" for the input field
    const isoDate = getIn(values, name);
    if (isoDate) {
      const localDate = new Date(isoDate).toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
      setDateValue(localDate);
    } else {
      setDateValue("");
    }
  }, [values, name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const isoDateFormat = new Date(selectedDate).toISOString(); // Convert to ISO format
    setDateValue(selectedDate); // Update local state
    setFieldValue(name, isoDateFormat); // Update Formik field value
  };

  // Use Formik's `getIn` to extract nested error messages and touched state
  const errorMessage = getIn(errors, name);
  const errorTouchedMessage = getIn(touched, name);

  return (
    <div className={className}>
      <label htmlFor={name} className="text-[15px] block mb-2 font-medium">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
        placeholder={placeholder}
        value={dateValue}
        onChange={handleChange}
        min={minDate}
        max={maxDate}
      />
      {errorTouchedMessage && errorMessage && (
        <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default DateInput;
