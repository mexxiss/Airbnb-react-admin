import React, { useState } from "react";
import { CloudUpload, Delete, Edit } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface ImageUploadFieldProps {
  formik?: any;
  index_number?: number;
  value: { url: string; work_name: string };
  onChange: (updatedValue: { url: string; work_name: string }) => void;
  onRemove: () => void;
  uploadFile: (folder: string, file: File) => Promise<{ imageUrl: string }>;
  onRemoveEmpty: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  formik,
  index_number,
  onRemoveEmpty,
  value,
  onChange,
  onRemove,
  uploadFile,
}) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const { imageUrl } = await uploadFile("properties", file);
      onChange({ ...value, url: imageUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        {!value.url && index_number !== -1 && index_number !== 0 && (
          <button
            className="bg-primary p-2 rounded flex items-center gap-2 text-white hover:bg-[#967e56] transition-colors"
            type="button"
            onClick={onRemoveEmpty}
          >
            <RemoveCircleOutlineIcon /> Remove Image
          </button>
        )}
      </div>

      {value.url ? (
        <div className="relative group">
          <img
            src={value.url}
            alt="Preview"
            className="w-full h-48 md:h-56 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <Delete className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label
            htmlFor="addPhotos"
            className={`
            relative w-full h-40 md:h-48 
            border-2 border-dashed border-gray-300 
            rounded-lg cursor-pointer 
            transition-colors duration-200
            hover:border-blue-500
            flex flex-col items-center justify-center
            ${loading ? "bg-gray-50" : "bg-white"}
          `}
          >
            <div className="space-y-2 text-center">
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <span className="relative font-medium text-blue-600 hover:text-blue-500">
                  {loading ? "Uploading..." : "Upload Images"}
                </span>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </label>
          <input
            id="addPhotos"
            className="hidden"
            type="file"
            onChange={handleImageUpload}
            disabled={loading}
            accept="image/*"
          />
        </div>
      )}

      {value.url && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Work Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              value={value.work_name}
              onChange={(e) =>
                onChange({ ...value, work_name: e.target.value })
              }
              className="
              block w-full px-4 py-2
              border border-gray-300 rounded-md
              focus:ring-blue-500 focus:border-blue-500
              placeholder-gray-400
              text-sm
            "
              placeholder="Enter work name"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Edit className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadField;
