import React from "react";
import PhoneInput from "react-phone-input-2";
import { useField, FieldArray } from "formik";
import { Plus, Trash2 } from "lucide-react";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  name: string;
  label?: string;
  country?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  isMultiple?: boolean;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({
  name,
  label,
  country = "us",
  placeholder = "Enter phone number",
  disabled = false,
  className = "",
  inputClassName = "",
  isMultiple = false,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-[15px] font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {isMultiple ? (
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <div className="space-y-4">
              {field.value && field.value.length > 0
                ? field.value.map((phone: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-grow relative">
                      <PhoneInput
                        country={country}
                        value={phone}
                        onChange={(value) =>
                          arrayHelpers.replace(index, value)
                        }
                        placeholder={placeholder}
                        disabled={disabled}
                        inputProps={{
                          name: `${name}.${index}`,
                          id: `${name}.${index}`,
                        }}
                        inputClass={`p-2 pl-12 !h-[43px] border-none rounded-lg outline-none transition-all duration-200 !bg-[#f3F4F6] !w-full ${meta.touched && meta.error?.[index]
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300 focus:border-blue-500"
                          } ${disabled
                            ? "bg-gray-100 cursor-not-allowed"
                            : "bg-white"
                          } ${inputClassName}`}
                      />
                      {meta.touched && meta.error?.[index] && (
                        <p className="mt-1 text-sm text-red-500">
                          {meta.error[index]}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="mt-1 p-2 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove phone number"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
                : null}
              <button
                type="button"
                onClick={() => arrayHelpers.push("")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Phone Number
              </button>
            </div>
          )}
        />
      ) : (
        <div className="relative">
          <PhoneInput
            country={country}
            value={field.value || ""}
            onChange={(value) => helpers.setValue(value)}
            placeholder={placeholder}
            disabled={disabled}
            inputProps={{
              name: name,
              id: name,
            }}
            inputClass={`p-2 pl-12 !h-[43px] border-none rounded-lg outline-none transition-all duration-200 !bg-[#f3F4F6] !w-full ${meta.touched && meta.error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-300 focus:border-blue-500"
              } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              } ${inputClassName}`}
          />
          {meta.touched && meta.error && (
            <p className="mt-1 text-sm text-red-500">{meta.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
