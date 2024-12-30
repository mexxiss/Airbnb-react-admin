import React from "react";

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
      <div className="image-preview-container">
        {formik.values[name]?.map((image: any, index: number) => (
          <div key={index} className="image-preview">
            <img
              src={image.isNew ? image.preview : image} // Use preview for new files, URL for existing
              alt={`preview-${index}`}
              style={{ width: "100px", height: "100px" }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              style={{ display: "block", margin: "10px auto" }}
            >
              Remove
            </button>
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
