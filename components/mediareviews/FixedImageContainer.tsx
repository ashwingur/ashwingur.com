import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface FixedImageContainerProps {
  imageSrc?: string;
  imageAlt?: string;
  priorityLoad: boolean;
  roundingClassName?: string;
  heightClassName?: string;
  bgColour?: string;
}

const FixedImageContainer: React.FC<FixedImageContainerProps> = ({
  imageSrc,
  imageAlt,
  priorityLoad,
  roundingClassName = "rounded-t-2xl",
  heightClassName = "h-80",
  bgColour = "#000000"
}) => {
  if (imageSrc && !imageAlt) {
    throw new Error("imageSrc is defined but no imageAlt was provided");
  }

  return (
    <div
      className={clsx(
        "w-full relative overflow-hidden hover:scale-125 transition-all duration-1000",
        heightClassName,
        roundingClassName,
        "before:content-[''] before:absolute before:w-full before:h-1/2 before:md-2/5 before:transition-all before:duration-1000",
        "before:bg-gradient-to-b before:from-black/0 before:to-black/80 before:z-10 before:bottom-0"
      )}
      style={{ backgroundColor: bgColour }}
    >
      {imageSrc && imageAlt &&
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="object-cover h-full w-full blur-3xl"
            fill
            priority={priorityLoad}
          />
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="object-contain h-full w-full"
            fill
            priority={priorityLoad}
          />
        </>
      }
    </div>
  );
};

export default FixedImageContainer;
