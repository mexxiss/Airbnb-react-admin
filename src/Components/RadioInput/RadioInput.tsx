import React from "react";
import classNames from "classnames";

interface RadioOption {
  id: string;
  label: string;
}

interface RadioInputProps {
  name: string;
  label?: string;
  options: RadioOption[]; // Array of radio options with `id` and `label`.
  value: string; // Formik's field value.
  error?: string; // Error message for validation.
  onChange: (value: string) => void; // Formik's `handleChange`.
  containerClass?: string; // Class for wrapping container.
  listClass?: string; // Class for the list of options.
  itemClass?: string; // Class for individual items.
  labelClass?: string; // Class for the main label.
  inputClass?: string; // Class for the hidden radio input.
  optionLabelClass?: string; // Class for the visible labels.
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  label,
  options,
  value,
  error,
  onChange,
  containerClass,
  listClass,
  itemClass,
  labelClass,
  inputClass,
  optionLabelClass,
}) => {
  const handleOptionChange = (id: string) => {
    onChange(id);
  };

  return (
    <div className={classNames("mb-4", containerClass)}>
      {label && (
        <p
          className={classNames("text-[15px] text-[#040404] mb-2", labelClass)}
        >
          {label}
        </p>
      )}
      <ul className={classNames("flex flex-wrap gap-3.5", listClass)}>
        {options.map((option) => (
          <li key={option.id} className={classNames("lg:grow", itemClass)}>
            <input
              type="radio"
              name={name}
              id={option.id}
              value={option.id}
              checked={value === option.id}
              onChange={() => handleOptionChange(option.id)}
              className={classNames("hidden", inputClass)} // Hidden input
            />
            <label
              htmlFor={option.id}
              className={classNames(
                "w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC]",
                optionLabelClass,
                { "border-blue-500 text-blue-500": value === option.id } // Active state
              )}
            >
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default RadioInput;
