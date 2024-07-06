import clsx from "clsx";
import React from "react";
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
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg bg-background-muted w-full lg:w-2/3 flex flex-col",
        className
      )}
    >
      <div className="w-full h-96 relative bg-black overflow-hidden rounded-t-2xl">
        {mediaReview.signed_cover_image && (
          <Image
            src={mediaReview.signed_cover_image ?? ""}
            alt={`Main review cover image of ${mediaReview.name}`}
            className=""
            fill
            priority
            objectFit="contain"
          />
        )}
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
