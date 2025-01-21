import React, { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import { getIn, useFormikContext } from "formik";
import classNames from "classnames";
import "react-quill/dist/quill.snow.css";

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

  const { values, errors, setFieldValue, touched, setFieldTouched } =
    useFormikContext<any>();
  const [editorValue, setEditorValue] = useState<string>(
    getIn(values, name) || ""
  );

  useEffect(() => {
    setEditorValue(getIn(values, name) || "");
  }, [values, name]);

  const handleChange = useCallback(
    (value: string) => {
      setEditorValue(value);
      setFieldValue(name, value);
      setFieldTouched(name, true, false);
    },
    [name, setFieldValue, setFieldTouched]
  );

  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-[15px] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          onBlur={() => setFieldTouched(name, true)}
          placeholder={placeholder}
          className={classNames(
            "mt-1 bg-white",
            isTouched && errorMessage ? "quill-error" : "border-[#E2E2EC]"
          )}
          style={{
            minHeight: minHeight,
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
            line-height: 1.5;
          }
          .quill-error .ql-toolbar.ql-snow,
          .quill-error .ql-container.ql-snow {
            border-color: #ef4444;
          }
        `}</style>
        {isTouched && errorMessage && (
          <div className="text-red-600 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReactQuillInput;
