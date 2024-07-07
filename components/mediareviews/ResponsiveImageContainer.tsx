import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ResponsiveImageContainerProps {
  imageSrc: string;
  imageAlt: string;
  priorityLoad: boolean;
  maxHeight?: number;
  bgImageColour?: string;
  roundingClassName?: string;
}

const ResponsiveImageContainer: React.FC<ResponsiveImageContainerProps> = ({
  imageSrc,
  imageAlt,
  maxHeight = 500,
  priorityLoad,
  bgImageColour = "#000000",
  roundingClassName = "rounded-t-2xl",
}) => {
  const [imageHeight, setImageHeight] = useState(200);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (imageContainerRef.current) {
        setWidth(imageContainerRef.current.offsetWidth);
        setImageHeight(aspectRatio * imageContainerRef.current.offsetWidth);
      }
    };
    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize); // Adjust on resize

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [aspectRatio]);

  const handleImageLoad = (event: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    const { naturalWidth, naturalHeight } = event;
    if (naturalWidth && naturalHeight) {
      const newAspectRatio = naturalHeight / naturalWidth;
      setAspectRatio(newAspectRatio);
      setImageHeight((width / naturalWidth) * naturalHeight);
    }
  };

  return (
    <div
      className={clsx(
        "w-full relative overflow-hidden hover:scale-125 transition-all duration-1000",
        roundingClassName,
        "before:content-[''] before:absolute before:w-full before:h-2/5 before:transition-all before:duration-1000",
        "before:bg-gradient-to-b before:from-black/0 before:to-black/80 before:z-10 before:bottom-0"
      )}
      style={{
        height: Math.min(imageHeight, maxHeight),
        backgroundColor: bgImageColour,
      }}
      ref={imageContainerRef}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="object-cover h-full w-full blur-3xl"
        fill
        priority={priorityLoad}
        onLoadingComplete={handleImageLoad}
      />
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="object-contain h-full w-full"
        fill
        priority={priorityLoad}
        onLoadingComplete={handleImageLoad}
      />
    </div>
  );
};

export default ResponsiveImageContainer;
