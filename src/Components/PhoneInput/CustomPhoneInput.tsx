import React, { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useField, FieldArray, useFormikContext } from "formik";
import { Plus, Trash2 } from "lucide-react";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  name: string;
  formik?: any;
  label?: string;
  country?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  isMultiple?: boolean;
  isAddShowButton?: boolean;
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
  required = false,
  isAddShowButton = false,
  formik,
}) => {
  const [field, meta, helpers] = useField(name);
  const { validateField, setFieldTouched, touched } = useFormikContext();

  const validatePhoneNumber = (value: string) => {
    validateField(name);
    setFieldTouched(name, true, false);
  };

  const handleSinglePhoneChange = (value: string, country: any) => {
    helpers.setValue(value);
    formik?.setFieldValue("country", country?.name || "");
    validatePhoneNumber(value);
  };

  const handleMultiplePhoneChange = (
    value: string,
    index: number,
    arrayHelpers: any
  ) => {
    arrayHelpers.replace(index, value);
    validatePhoneNumber(`${name}.${index}`);
  };

  useEffect(() => {
    setFieldTouched(name, true, false);
  }, [name, setFieldTouched]);

  const getInputClassName = (error?: string) => `
    p-2 pl-12 !h-[43px] border-none rounded-lg outline-none 
    transition-all duration-200 !bg-[#f3F4F6] !w-full 
    ${
      error
        ? "border-red-500 focus:border-red-600"
        : "border-gray-300 focus:border-blue-500"
    }
    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
    ${inputClassName}
  `;

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-[15px] font-medium text-gray-700 mb-2">
          {label} {required && <span>*</span>}
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
                            handleMultiplePhoneChange(
                              value,
                              index,
                              arrayHelpers
                            )
                          }
                          placeholder={placeholder}
                          disabled={disabled}
                          enableSearch
                          inputProps={{
                            name: `${name}.${index}`,
                            id: `${name}.${index}`,
                          }}
                          inputClass={getInputClassName(meta.error?.[index])}
                        />
                        {meta.error?.[index] && (
                          <p className="mt-1 text-sm text-red-500">
                            {meta.error[index]}
                          </p>
                        )}
                      </div>
                      {isAddShowButton && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="mt-1 p-2 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove phone number"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))
                : null}
              {isAddShowButton && (
                <button
                  type="button"
                  onClick={() => arrayHelpers.push("")}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Phone Number
                </button>
              )}
            </div>
          )}
        />
      ) : (
        <div className="relative">
          <PhoneInput
            country={country}
            value={field.value || ""}
            onChange={handleSinglePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            enableSearch
            inputProps={{
              name: name,
              id: name,
            }}
            inputClass={getInputClassName(meta.error)}
          />
          {meta.error && (
            <p className="mt-1 text-sm text-red-500">{meta.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomPhoneInput;
