import React, { useCallback, useState } from "react";
import { useFormikContext } from "formik";
import classNames from "classnames";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";

interface InputProps {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "textarea" | string; // Allow custom input types.
  value?: string | number;
  placeholder?: string;
  inputClass?: string; // For tailwind classes directly on input.
  labelClass?: string; // For tailwind classes directly on label.
  containerClass?: string; // For wrapping container.
  disabled?: boolean;
  rows?: number; // For textarea rows.
  onChangeValue?: (name: string, value: string) => void; // Pass value to parent component.
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  value,
  placeholder,
  inputClass,
  labelClass,
  containerClass,
  disabled = false,
  rows = 6, // Default rows for textarea.
  onChangeValue,
}) => {
  const formikContext = useFormikContext<{ [key: string]: any }>();
  const { handleBlur, handleChange, values } = formikContext || {};

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (onChangeValue) {
      onChangeValue(name, value);
    }
    handleChange?.(e);
  };

  const inputValue = value ?? values?.[name] ?? "";

  return (
    <div className={classNames("mb-4", containerClass)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "text-[15px] text-gray-900 mb-2 inline-block",
            labelClass
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            disabled={disabled}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            value={inputValue}
            className={classNames(
              "px-4 py-3 text-gray-600 placeholder-gray-400 border border-gray-300 rounded w-full bg-gray-100 resize-none",
              inputClass
            )}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type === "password" && isPasswordVisible ? "text" : type}
            disabled={disabled}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            value={inputValue}
            className={classNames(
              "py-3 leading-4 text-gray-600 placeholder-gray-400 border border-gray-300 rounded w-full bg-gray-100",
              {
                "pr-10 pl-4": type === "password",
                "px-4": type !== "password",
              },
              inputClass
            )}
          />
        )}
        {type === "password" && (
          <span
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Visibility className="!text-xl" />
            ) : (
              <VisibilityOffOutlined className="!text-xl" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
