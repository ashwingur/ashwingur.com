import React from "react";
import { SubMediaReview } from "shared/validations/MediaReviewSchemas";
import FixedImageContainer from "./FixedImageContainer";
import clsx from "clsx";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import DOMPurify from "dompurify";
import { formatRunTime } from "./MediaReviewCard";

interface SubMediaReviewCardProps {
  review: SubMediaReview;
  parentIndex: number;
  consumedTitle: string;
  showImages: boolean;
  className?: string;
}

const SubMediaReviewCard: React.FC<SubMediaReviewCardProps> = ({
  review,
  parentIndex,
  consumedTitle,
  showImages,
  className,
}) => {
  const consumedDate = review.consumed_date
    ? new Date(review.consumed_date)
    : undefined;
  const formattedConsumedDate = consumedDate
    ? consumedDate.getDate() === 1 && consumedDate.getMonth() === 0
      ? consumedDate.getFullYear()
      : consumedDate.toLocaleDateString("en-AU", {
          month: "short",
          year: "numeric",
        })
    : "";

  const pros = review.pros.map((pro, index) => (
    <li key={index} className="flex gap-2">
      <div className="mt-[2px]">
        <IoMdCheckmark />
      </div>
      <p>{pro}</p>
    </li>
  ));
  const cons = review.cons.map((con, index) => (
    <li key={index} className="flex gap-2">
      <div className="mt-[2px]">
        <IoMdClose />
      </div>
      {con}
    </li>
  ));

  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl bg-background-hover shadow-xl",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden">
        <div className="overflow-hidden rounded-t-2xl">
          <FixedImageContainer
            imageSrc={
              showImages && review.local_signed_cover_image
                ? review.local_signed_cover_image
                : undefined
            }
            imageAlt={`Main review cover image of ${review.name}`}
            priorityLoad={parentIndex < 5}
            heightClassName={
              showImages && review.local_signed_cover_image
                ? "h-48 lg:h-52"
                : "h-28"
            }
            bgColour={review.cover_image_bg_colour ?? undefined}
            miniCard={review.cover_image_bg_colour !== undefined}
          />
        </div>

        <div
          className={clsx(
            "pointer-events-none absolute bottom-0 left-0 z-20 flex w-full items-end justify-between p-4 text-white",
          )}
        >
          <div>
            {review.media_creation_date && (
              <p className="font-mono text-lg tracking-widest">
                {new Date(review.media_creation_date).getFullYear()}
              </p>
            )}
            <p className="text-xl font-bold lg:text-2xl">{review.name}</p>
          </div>
          <p className="ml-8 text-4xl">{review.rating}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between">
          <div>
            {review.run_time && (
              <p>
                <span className="font-bold">Run Time</span>{" "}
                {formatRunTime(review.run_time)}
              </p>
            )}
            {review.word_count && (
              <p>
                <span className="font-bold">Word Count</span>{" "}
                {review.word_count?.toLocaleString()}
              </p>
            )}
          </div>
          {review.consumed_date && (
            <p className="ml-4">
              <span className="font-bold">{consumedTitle}</span>{" "}
              {formattedConsumedDate}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 text-sm md:flex-row">
          {pros.length > 0 && (
            <div className={clsx(cons.length > 0 ? "md:w-1/2" : "")}>
              <h3>Pros</h3>
              <ul className="flex flex-col">{pros}</ul>
            </div>
          )}
          {cons.length > 0 && (
            <div className={clsx(pros.length > 0 ? "md:w-1/2" : "")}>
              <h3>Cons</h3>
              <ul>{cons}</ul>
            </div>
          )}
        </div>
      </div>

      {review.review_content && (
        <div
          className="editor p-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(review.review_content),
          }}
        />
      )}
      {review.review_last_update_date && (
        <p className="mb-2 ml-auto mr-4 mt-auto text-xs italic">
          Updated{" "}
          {new Date(review.review_last_update_date).toLocaleDateString()}{" "}
          {new Date(review.review_last_update_date).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default SubMediaReviewCard;
