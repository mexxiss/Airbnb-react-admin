import React, { useCallback, useState } from "react";
import { useFormikContext } from "formik";
import classNames from "classnames";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";

interface InputProps {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "textarea" | "number" | string;
  value?: string | number;
  placeholder?: string;
  inputClass?: string;
  labelClass?: string;
  containerClass?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  onChangeValue?: (name: string, value: string | number) => void;
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
  rows = 6,
  required = false,
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
    let { name, value } = e.target;

    if (type === "number" && Number(value) < 0) {
      value = "0"; // Prevent negative numbers
    }

    if (onChangeValue) {
      onChangeValue(name, value);
    }
    handleChange?.(e);
  };

  const inputValue = value ?? values?.[name] ?? "";

  return (
    <div className={classNames("", containerClass)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "text-[15px] text-gray-900 mb-2 inline-block",
            labelClass
          )}
        >
          {label} {required && <span>*</span>}
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
            min={type === "number" ? 0 : undefined} // Prevent negative numbers
            className={classNames(
              "py-3 leading-4 text-gray-600 placeholder-gray-400 border border-gray-300 rounded w-full bg-gray-100",
              {
                "pr-10 pl-4": type === "password",
                "px-4": type !== "password",
                "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none":
                  type === "number",
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
