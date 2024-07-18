import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

interface FixedImageContainerProps {
  imageSrc?: string;
  imageAlt?: string;
  priorityLoad: boolean;
  roundingClassName?: string;
  heightClassName?: string;
  bgColour?: string;
  miniCard?: boolean;
}

const FixedImageContainer: React.FC<FixedImageContainerProps> = ({
  imageSrc,
  imageAlt,
  priorityLoad,
  roundingClassName = "rounded-t-2xl",
  heightClassName = "h-60",
  bgColour = "#3b3b3b",
  miniCard = false,
}) => {
  if (imageSrc && !imageAlt) {
    throw new Error("imageSrc is defined but no imageAlt was provided");
  }

  const [isLoading, setIsLoading] = useState(imageSrc !== undefined);

  return (
    <div
      className={clsx(
        "w-full relative overflow-hidden hover:scale-125 transition-all duration-700",
        heightClassName,
        roundingClassName,
        "before:content-[''] before:absolute before:w-full before:transition-all before:duration-1000",
        "before:bg-gradient-to-b before:z-10 before:bottom-0",
        miniCard
          ? "before:h-full before:from-black/0 before:to-black/80"
          : "before:h-3/5 before:md-2/5 before:from-black/0 before:to-black/80",
        isLoading ? "animate-pulse" : ""
      )}
      style={
        isLoading || imageSrc === undefined
          ? { backgroundColor: bgColour }
          : { backgroundColor: "#3b3b3b" }
      }
    >
      {imageSrc && imageAlt && (
        <>
          <Image
            unoptimized
            src={imageSrc}
            alt={imageAlt}
            className="object-cover h-full w-full blur-3xl"
            fill
            priority={priorityLoad}
          />
          <Image
            unoptimized
            src={imageSrc}
            alt={imageAlt}
            className="object-contain h-full w-full"
            onLoad={(e) => {
              setIsLoading(false);
            }}
            fill
            priority={priorityLoad}
          />
        </>
      )}
    </div>
  );
};

export default FixedImageContainer;
