import React from "react";

interface PropertyImage {
  img_url: string;
  type: string;
  _id: string;
}

interface PropertyImagesProps {
  images: PropertyImage[];
  onViewAllClick: () => void;
}

const PropertyImagesGrid: React.FC<PropertyImagesProps> = ({
  images,
  onViewAllClick,
}) => {
  if (images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <div className="mt-4">
      <div className="hidden lg:grid grid-cols-2 h-[350px] xl:h-[400px] gap-3 xl:gap-5">
        {/* First Image */}
        <div className="h-[350px] xl:h-[400px] rounded-2xl overflow-hidden">
          <img
            src={images[0].img_url}
            alt="Property"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Remaining Images */}
        <div className="grid grid-cols-2 gap-3 xl:gap-5 h-[350px] xl:h-[400px]">
          {images.slice(1, 4).map((image, index) => (
            <div key={image._id} className="h-full rounded-2xl overflow-hidden">
              <img
                src={image.img_url}
                alt={`Property ${index + 2}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          {/* "View All Photos" Overlay */}
          {images.length > 4 && (
            <div className="h-full rounded-2xl overflow-hidden relative cursor-pointer">
              <img
                src={images[3].img_url}
                alt="View More"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#151F2580] flex items-center justify-center flex-col"
                onClick={onViewAllClick}
              >
                <p className="text-xl font-semibold text-white">
                  {images.length - 4}+
                </p>
                <p className="text-white">View all photos</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyImagesGrid;
