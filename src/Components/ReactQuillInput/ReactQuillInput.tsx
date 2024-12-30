import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import { useFormikContext } from "formik";
import classNames from "classnames";

interface ReactQuillInputProps {
  label?: string;
  minHeight?: string;
  name: string;
  placeholder?: string;
  className?: string;
}

const ReactQuillInput: React.FC<ReactQuillInputProps> = ({
  label,
  name,
  placeholder = "Write something...",
  className = "",
  minHeight = "100px",
}) => {
  // Define the toolbar with similar options
  const toolbarOptions = [
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ];

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];
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
          className={classNames(
            "mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white resize-none"
          )}
          style={{
            minHeight: minHeight,
            lineHeight: "1.5",
          }}
          modules={{
            toolbar: toolbarOptions,
          }}
          formats={formats}
          theme="snow"
        />
        <style>{`
       .ql-editor {
          min-height: ${minHeight};
        }
      `}</style>
        {errorMessage && typeof errorMessage === "string" && (
          <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReactQuillInput;
