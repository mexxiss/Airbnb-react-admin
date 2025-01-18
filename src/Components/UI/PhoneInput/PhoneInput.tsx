import React from "react";
import { useField } from "formik";
import { X, Plus } from "lucide-react";

interface PhoneInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  index?: number;
  onRemove?: (index: number) => void;
  canAdd?: boolean;
  onAdd?: () => void;
  isArray?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder = "+971XXXXXXXXX",
  index,
  onRemove,
  canAdd,
  onAdd,
  isArray = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /^[\d+]$/;
    if (
      !allowedChars.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            {...field}
            type="tel"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              meta.touched && meta.error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
            maxLength={13}
          />
          {isArray && onRemove && (
            <button
              type="button"
              onClick={() => onRemove(index!)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {canAdd && onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="p-2 text-blue-500 hover:text-blue-600"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};
