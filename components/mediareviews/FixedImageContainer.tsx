import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface FixedImageContainerProps {
  imageSrc?: string;
  imageAlt?: string;
  priorityLoad: boolean;
  roundingClassName?: string;
  heightClassName?: string;
  bgColour?: string;
  miniCard?: boolean;
}

interface RetryableImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  maxRetries?: number;
  onRetriesExhausted?: () => void;
}

export const RetryableImage: React.FC<RetryableImageProps> = ({
  src,
  alt,
  maxRetries = 2,
  onLoad,
  onError,
  ...props
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [retrySrc, setRetrySrc] = useState<string>(src);

  useEffect(() => {
    setRetryCount(0);
    setRetrySrc(src);
  }, [src]);

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (retryCount < maxRetries) {
      const cacheBuster = `cb=${Date.now()}`;
      const separator = src.includes("?") ? "&" : "?";
      setRetrySrc(`${src}${separator}${cacheBuster}`);
      setRetryCount((prev) => prev + 1);
    } else {
      // Call user-defined onError if retries exhausted
      onError?.(event);
    }
  };

  return (
    <Image
      unoptimized
      src={retrySrc}
      alt={alt}
      onLoad={onLoad}
      onError={handleError}
      {...props}
    />
  );
};

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
          <RetryableImage
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover blur-3xl"
            fill
            priority={priorityLoad}
            maxRetries={2}
          />
          <RetryableImage
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-contain"
            onLoad={(e) => {
              setIsLoading(false);
            }}
            onError={(e) => {
              setIsLoading(false);
            }}
            fill
            priority={priorityLoad}
            maxRetries={2}
          />
        </>
      )}
    </div>
  );
};

export default FixedImageContainer;
