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
        "relative w-full overflow-hidden transition-all duration-700 hover:scale-125",
        heightClassName,
        roundingClassName,
        "before:absolute before:w-full before:transition-all before:duration-1000 before:content-['']",
        "before:bottom-0 before:z-10 before:bg-gradient-to-b",
        miniCard
          ? "before:h-full before:from-black/0 before:to-black/80"
          : "before:md-2/5 before:h-3/5 before:from-black/0 before:to-black/80",
        isLoading ? "animate-pulse" : "",
      )}
      style={
        isLoading || imageSrc === undefined
          ? { backgroundColor: bgColour }
          : { backgroundColor: "#000" }
      }
    >
      {imageSrc && imageAlt && (
        <>
          <Image
            unoptimized
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover blur-3xl"
            fill
            priority={priorityLoad}
          />
          <Image
            unoptimized
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-contain"
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
