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
        "relative w-full overflow-hidden transition-all duration-1000 hover:scale-125",
        roundingClassName,
        "before:absolute before:h-2/5 before:w-full before:transition-all before:duration-1000 before:content-['']",
        "before:bottom-0 before:z-10 before:bg-gradient-to-b before:from-black/0 before:to-black/80",
      )}
      style={{
        height: Math.min(imageHeight, maxHeight),
        backgroundColor: bgImageColour,
      }}
      ref={imageContainerRef}
    >
      <Image
        unoptimized
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-cover blur-3xl"
        fill
        priority={priorityLoad}
        onLoadingComplete={handleImageLoad}
      />
      <Image
        unoptimized
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-contain"
        fill
        priority={priorityLoad}
        onLoadingComplete={handleImageLoad}
      />
    </div>
  );
};

export default ResponsiveImageContainer;
