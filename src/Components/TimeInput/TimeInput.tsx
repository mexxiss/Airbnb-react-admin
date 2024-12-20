interface TimeInputProps {
  name: string;
  label: string;
  value: string; // Expecting string as the value type
  onChange: (value: string) => void; // onChange expects a string value
  min: string;
  max: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  name,
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  placeholder = "",
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the value directly from the input element and pass it to onChange
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-[15px]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="time"
          id={name}
          name={name}
          value={value}
          onChange={handleChange} // Call the handler with value
          min={min}
          max={max}
          required={required}
          placeholder={placeholder}
          className={`py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px] ${className}`}
        />
      </div>
    </div>
  );
};

export default TimeInput;
