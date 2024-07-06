import clsx from "clsx";
import { MediaReview } from "shared/validations/MediaReviewSchemas";

import Link from "next/link";
import ResponsiveImageContainer from "./ResponsiveImageContainer";

interface MediaReviewCardProps {
  mediaReview: MediaReview;
  index: number;
  className?: string;
}

const MediaReviewCard: React.FC<MediaReviewCardProps> = ({
  className,
  index,
  mediaReview,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg bg-background-muted w-full lg:w-2/3 flex flex-col",
        className
      )}
    >
      <div className="w-full relative">
        {mediaReview.signed_cover_image && (
          <ResponsiveImageContainer
            imageSrc={mediaReview.signed_cover_image ?? ""}
            imageAlt={`Main review cover image of ${mediaReview.name}`}
            maxHeight={500}
            bgImageColour={mediaReview.cover_image_bg_colour ?? undefined}
            priorityLoad={index < 5}
          />
        )}
        <div
          className={clsx(
            "w-full p-4 text-white z-20 flex justify-between items-end",
            mediaReview.signed_cover_image
              ? "absolute bottom-0 left-0"
              : "bg-black rounded-2xl"
          )}
        >
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
          className="btn absolute right-0 top-0 m-4"
          href={`/MediaReviewsV2/Edit?id=${mediaReview.id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default MediaReviewCard;
