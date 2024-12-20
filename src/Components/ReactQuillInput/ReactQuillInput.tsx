import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import { useFormikContext } from "formik";

interface ReactQuillInputProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}

const ReactQuillInput: React.FC<ReactQuillInputProps> = ({
  label,
  name,
  placeholder = "Write something...",
  className = "",
}) => {
  const { values, errors, setFieldValue } = useFormikContext<any>();

  const [editorValue, setEditorValue] = useState<string>(values[name] || "");

  useEffect(() => {
    setEditorValue(values[name] || "");
  }, [values[name]]);

  const handleChange = useCallback(
    (value: string) => {
      setEditorValue(value);
      setFieldValue(name, value);
    },
    [name, setFieldValue]
  );

  const errorMessage = errors[name];

  return (
    <div className={className}>
      <label htmlFor={name} className="text-[15px]">
        {label}
      </label>
      <div className="relative mt-2">
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white resize-none"
          style={{
            minHeight: "110px", // Adjust height to match 4 rows
            lineHeight: "1.5", // Match textarea line height
          }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
            ], // Limited toolbar for simplicity
          }}
        />
        {errorMessage && typeof errorMessage === "string" && (
          <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReactQuillInput;
