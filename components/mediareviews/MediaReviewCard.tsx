import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { MediaReview } from "shared/validations/MediaReviewSchemas";
import Image from "next/image";
import Link from "next/link";

interface MediaReviewCardProps {
  mediaReview: MediaReview;
  className?: string;
}

const MediaReviewCard: React.FC<MediaReviewCardProps> = ({
  className,
  mediaReview,
}) => {
  //   const [aspectRatio, setAspectRatio] = useState(16 / 9); // Default aspect ratio
  const [imageHeight, setImageHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
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
  }, []);

  const handleImageLoad = (event: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    const { naturalWidth, naturalHeight } = event;
    if (naturalWidth && naturalHeight) {
      setAspectRatio(naturalHeight / naturalWidth);
      setImageHeight((width / naturalWidth) * naturalHeight);
    }
  };

  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg bg-background-muted w-full lg:w-2/3 flex flex-col",
        className
      )}
    >
      <div
        className={`w-full relative bg-black overflow-hidden rounded-t-2xl 
            before:content-[''] before:absolute before:w-full before:h-full before:bg-gradient-to-b before:from-black/0 before:to-black/70 before:z-10`}
        style={
          mediaReview.signed_cover_image
            ? { height: Math.min(imageHeight, 500) }
            : {}
        }
        ref={imageContainerRef}
      >
        {mediaReview.signed_cover_image && (
          <Image
            src={mediaReview.signed_cover_image ?? ""}
            alt={`Main review cover image of ${mediaReview.name}`}
            className="object-contain h-full w-full"
            fill
            priority
            onLoadingComplete={handleImageLoad}
            ref={imageRef}
          />
        )}
        <div className="absolute bottom-0 left-0 p-2 text-white z-20">
          {mediaReview.media_creation_date && (
            <div>{new Date(mediaReview.media_creation_date).getFullYear()}</div>
          )}
          <div className="text-3xl lg:text-4xl">{mediaReview.name}</div>
        </div>
      </div>

      <h2 className="text-center">{mediaReview.name}</h2>
      <Link
        className="btn self-center my-4"
        href={`/MediaReviewsV2/Edit?id=${mediaReview.id}`}
      >
        Edit
      </Link>
    </div>
  );
};

export default MediaReviewCard;
