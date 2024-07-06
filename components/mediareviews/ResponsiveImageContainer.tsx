import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ResponsiveImageContainerProps {
  imageSrc: string;
  imageAlt: string;
  maxHeight?: number;
}

const ResponsiveImageContainer: React.FC<ResponsiveImageContainerProps> = ({
  imageSrc,
  imageAlt,
  maxHeight = 500,
}) => {
  const [imageHeight, setImageHeight] = useState(0);
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
        "w-full relative bg-cyan-900 overflow-hidden rounded-2xl",
        "before:content-[''] before:absolute before:w-full before:h-2/5 before:bg-gradient-to-b before:from-black/0 before:to-black/80 before:z-10 before:bottom-0"
      )}
      style={{ height: Math.min(imageHeight, maxHeight) }}
      ref={imageContainerRef}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="object-contain h-full w-full"
        fill
        priority
        onLoadingComplete={handleImageLoad}
      />
    </div>
  );
};

export default ResponsiveImageContainer;
