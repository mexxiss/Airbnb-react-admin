import React from "react";
import DeleteIcon from "../../assets/dynamic-icons/DeleteIcon";

interface ImageUploadProps {
  name: string; // Field name for images
  formik: any; // The Formik instance passed from the parent
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name, formik }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImages = filesArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isNew: true, // Mark as a new file
      }));
      formik.setFieldValue(name, [...formik.values[name], ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formik.values[name].filter(
      (_: any, i: number) => i !== index
    );
    formik.setFieldValue(name, updatedImages);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <div className="image-preview-container mt-3 flex gap-2">
        {formik.values[name]?.map((image: any, index: number) => (
          <div className="border border-primary rounded-lg overflow-hidden px-2 py-2 bg-slate-100 relative">
            <img
              alt={`preview-${index}`}
              className="w-full h-[120px] object-cover"
              src={image.isNew ? image.preview : image}
            />
            <div className="absolute right-2.5 top-2.5 flex flex-col gap-2">
              <span className="text-red-600 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-xl border border-primary cursor-pointer">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{ display: "block", margin: "10px auto" }}
                >
                  <DeleteIcon
                    size={20}
                    color="#bb9e6c"
                    className="hover:opacity-75"
                  />
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default ImageUpload;
