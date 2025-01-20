import React from "react";
import Slider from "react-slick";
import { Close } from "@mui/icons-material";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";

interface Image {
  img_url: string;
  type: string;
  _id: string;
}

interface ImageSliderModalProps {
  isOpen: boolean;
  images: Image[];
  onClose: () => void;
}

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({
  isOpen,
  images,
  onClose,
}) => {
  const sliderRef = React.useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  if (!isOpen) return null;

  return (
    <div className="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 lg:flex items-center justify-center z-50">
      <div className="relative w-3/4 max-w-4xl">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-primary text-white z-10 w-9 h-9 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 duration-300"
          onClick={onClose}
        >
          <Close className="text-xl" />
        </button>

        {/* Image Slider */}
        <div className="slider relative">
          <button
            className="absolute top-1/2 -left-12 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300"
            onClick={handlePrev}
          >
            <KeyboardArrowLeftOutlined />
          </button>

          <button
            className="absolute top-1/2 -right-12 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300"
            onClick={handleNext}
          >
            <KeyboardArrowRightOutlined />
          </button>

          <Slider {...settings} ref={(slider) => (sliderRef.current = slider)}>
            {images.map((image) => (
              <div key={image._id} className="h-[500px]">
                <img
                  src={image.img_url}
                  alt={`Slide ${image._id}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ImageSliderModal;
