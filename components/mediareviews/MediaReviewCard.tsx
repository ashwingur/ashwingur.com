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
        className={`w-full relative bg-cyan-900 overflow-hidden rounded-2xl 
            before:content-[''] before:absolute before:w-full before:h-1/2 before:bg-gradient-to-b before:from-black/0 before:to-black/90 before:z-10 before:bottom-0`}
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
        <div className="absolute bottom-0 left-0 w-full p-4 text-white z-20 flex justify-between items-end">
          <div>
            {mediaReview.media_creation_date && (
              <p className="font-mono tracking-widest text-lg">
                {new Date(mediaReview.media_creation_date).getFullYear()}
              </p>
            )}
            <p>{mediaReview.genres.map((g) => g.name).join(", ")}</p>
            <p className="text-3xl lg:text-4xl font-bold">{mediaReview.name}</p>
          </div>
          <p className="text-5xl">{mediaReview.rating}</p>
        </div>
        <Link
          className="btn absolute right-0 m-4"
          href={`/MediaReviewsV2/Edit?id=${mediaReview.id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default MediaReviewCard;
