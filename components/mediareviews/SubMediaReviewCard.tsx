import React from "react";
import { SubMediaReview } from "shared/validations/MediaReviewSchemas";
import FixedImageContainer from "./FixedImageContainer";
import clsx from "clsx";
import Link from "next/link";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import DOMPurify from "dompurify";

interface SubMediaReviewCardProps {
  review: SubMediaReview;
  parentIndex: number;
  className?: string;
}

const SubMediaReviewCard: React.FC<SubMediaReviewCardProps> = ({
  review,
  parentIndex,
  className,
}) => {
  const consumedDate = review.consumed_date
    ? new Date(review.consumed_date)
    : undefined;

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
        "rounded-2xl shadow-xl bg-background-hover flex flex-col",
        className
      )}
    >
      <div className="w-full relative overflow-hidden">
        {review.signed_cover_image && (
          <div className="overflow-hidden rounded-t-2xl">
            <FixedImageContainer
              imageSrc={review.signed_cover_image ?? ""}
              imageAlt={`Main review cover image of ${review.name}`}
              priorityLoad={parentIndex < 5}
              heightClassName="h-72 lg:h-96"
            />
          </div>
        )}

        <div
          className={clsx(
            "w-full p-4 text-white z-20 flex justify-between items-end pointer-events-none",
            review.signed_cover_image
              ? "absolute bottom-0 left-0"
              : "bg-black rounded-t-2xl h-96 lg:h-[30rem]"
          )}
        >
          <div>
            {review.media_creation_date && (
              <p className="font-mono tracking-widest text-lg">
                {new Date(review.media_creation_date).getFullYear()}
              </p>
            )}
            <p className="text-3xl lg:text-4xl font-bold">{review.name}</p>
          </div>
          <p className="text-7xl ml-4">{review.rating}</p>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex justify-between">
          <div>
            {review.run_time && (
              <p>
                <span className="font-bold">Run Time</span> {review.run_time}{" "}
                min
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
              <span className="font-bold">Consumed</span>{" "}
              {consumedDate?.toLocaleDateString("en-AU", {
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 text-sm">
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
        <p className="text-xs italic ml-auto mb-2 mr-4 mt-auto">
          Updated{" "}
          {new Date(review.review_last_update_date).toLocaleDateString()}{" "}
          {new Date(review.review_last_update_date).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default SubMediaReviewCard;
