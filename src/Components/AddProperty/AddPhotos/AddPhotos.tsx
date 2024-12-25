import React, { useState, useCallback } from "react";
import uploadIcon from "../../../assets/icons/uploadIcon.png";
import trashIcon from "../../../assets/icons/trashIcon.png";
import Select, { SingleValue } from "react-select";
import useCreatePropertyStoreNew from "../../../store/useCreatePropertyStoreNew";
import {
  deleteGalleryItem,
  fetchGallery,
  uploadFile,
} from "../../../services/apiServices";
import { useFetchGalleryType } from "../../../hooks/react-query/gallery";
import Loader from "../../Loader/Loader";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";

interface UploadedImage {
  id: string;
  file: File | null;
  preview: string;
  name: string;
  selectedOption: { value: string; label: string } | null;
  _id?: string;
}

const AddPhotos = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const { handleChange, property_images_urls, property_images } =
    useCreatePropertyStoreNew();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  console.log({ property_images_urls }, { property_images });

  const { data, isLoading, error, isError } = useFetchGalleryType();
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [selectedName, setSelectedName] = useState<SingleValue<string>>("");
  const [images, setImages] = useState<UploadedImage[]>(
    property_images_urls || []
  );

  const formattedOptions =
    data?.data.map((option) => ({
      value: option._id,
      label: option.name,
    })) || [];

  const handleOptionChange = useCallback(
    (option: SingleValue<{ value: string; label: string }>) => {
      setSelectedOption(option);
      setSelectedName(option?.label || "");
    },
    []
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0 && selectedOption) {
      setIsUploading(true);
      try {
        const uploadedImages = await Promise.all(
          Array.from(files).map(async (file) => {
            const { imageUrl } = await uploadFile("properties", file);
            const { data } = await fetchGallery({
              img_url: imageUrl || "",
              type: selectedOption.value,
            });

            return {
              id: crypto.randomUUID(),
              file,
              preview: imageUrl,
              name: selectedName || "",
              selectedOption,
              _id: data?._id,
            };
          })
        );
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
        setSelectedOption(null); // Reset after successful upload
      } catch (error) {
        console.error("Upload error:", error);
        setSelectedOption(null); // Reset the selection if error occurs
        alert("Failed to upload images. Please try again.");
      } finally {
        setIsUploading(false); // Reset uploading state after process completes
      }
    } else {
      alert("Please select an option before uploading images.");
    }
  };

  const handleDeleteImage = async (id: string, _id: string) => {
    try {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((image) => image.id !== id);
        const imageIds = updatedImages.map((image) => image._id || "");
        handleChange("property_images_urls", updatedImages);
        handleChange("property_images", imageIds);

        return updatedImages;
      });
      if (_id) {
        await deleteGalleryItem(_id);
      }
    } catch (error) {
      console.error("Failed to delete image:");
      alert("Failed to delete image. Please try again.");
    }
  };

  const handleSubmitImage = () => {
    if (images.length > 0) {
      const imageIds = images.map((image) => image._id || "");
      handleChange("property_images_urls", [...images]);
      handleChange("property_images", imageIds);
      setCurrentStep(4);
    }
  };

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  return (
    <>
      <div className="pb-16 lg:pb-0">
        <div className="grid grid-cols-2 xs:grid-cols-3 md:flex sm:flex-wrap gap-x-4 gap-y-5 md:gap-6 lg:gap-11 mb-[30px]">
          {images.map((image) => (
            <div key={image.id} className="md:w-44 lg:w-56 relative">
              <div className="md:w-44 lg:w-56 h-36 xs:h-32 sm:h-44 lg:h-56">
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id, image?._id || "")}
                  className="w-10 h-10 rounded bg-[#00000066] absolute right-2.5 top-2.5 flex items-center justify-center"
                >
                  <img src={trashIcon} alt="Delete" className="w-[18px]" />
                </button>
                <img
                  src={image.preview}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-t"
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Type name here..."
                  disabled
                  defaultValue={image.name}
                />
              </div>
            </div>
          ))}
          <div>
            <label
              htmlFor="addPhotos"
              className="w-full md:w-44 lg:w-56 h-full xs:min-h-32 sm:min-h-44 lg:min-h-56 border border-dashed border-[#D6D6D6] rounded cursor-pointer flex items-center justify-center flex-col sm:flex-row gap-3 mt-4"
            >
              <img src={uploadIcon} alt="Upload" className="w-5" />
              <span className="font-medium text-sm text-[#A9ACB4]">
                {isUploading ? "Uploading..." : "Upload Images"}
              </span>
            </label>
            {!selectedOption ? (
              <div className="text-red-600 mt-1">
                Please select an option before uploading images.
              </div>
            ) : (
              <input
                type="file"
                name="addPhotos"
                id="addPhotos"
                className="hidden"
                accept="image/*"
                // multiple
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            )}

            <Select
              maxMenuHeight={100}
              options={formattedOptions}
              placeholder="Select an option"
              value={selectedOption}
              onChange={handleOptionChange}
              classNamePrefix="react-select"
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 lg:mt-[6rem] lg:mb-5">
        <button
          disabled={images?.length === 0}
          type="button"
          className="btn1 !rounded !px-10"
          onClick={handleSubmitImage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AddPhotos;
