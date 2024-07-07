import clsx from "clsx";
import { MediaReview } from "shared/validations/MediaReviewSchemas";

import Link from "next/link";
import ResponsiveImageContainer from "./ResponsiveImageContainer";
import MediaTypeIcon from "./MediaTypeIcon";
import { FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import DOMPurify from "dompurify";

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
  const consumedDate = mediaReview.consumed_date
    ? new Date(mediaReview.consumed_date)
    : undefined;

  const pros = mediaReview.pros.map((pro, index) => (
    <li key={index} className="flex gap-2">
      <div className="mt-1">
        <IoMdCheckmark />
      </div>
      <p>{pro}</p>
    </li>
  ));
  const cons = mediaReview.cons.map((con, index) => (
    <li key={index} className="flex gap-2">
      <div className="mt-1">
        <IoMdClose />
      </div>
      {con}
    </li>
  ));

  let creatorTitle = "Creator";
  switch (mediaReview.media_type) {
    case "Movie":
      creatorTitle = "Director/Studio";
      break;
    case "Book":
      creatorTitle = "Author";
      break;
    case "Show":
      creatorTitle = "Showrunner/Studio";
      break;
    case "Game":
      creatorTitle = "Developer";
      break;
    case "Music":
      creatorTitle = "Artist";
      break;
    default:
      break;
  }

  return (
    <div
      className={clsx(
        "rounded-2xl shadow-lg bg-background-muted flex flex-col",
        className
      )}
    >
      <div className="w-full relative overflow-hidden">
        {mediaReview.signed_cover_image && (
          <div className="overflow-hidden rounded-t-2xl">
            <ResponsiveImageContainer
              imageSrc={mediaReview.signed_cover_image ?? ""}
              imageAlt={`Main review cover image of ${mediaReview.name}`}
              maxHeight={500}
              bgImageColour={mediaReview.cover_image_bg_colour ?? undefined}
              priorityLoad={index < 5}
            />
          </div>
        )}
        <div className="absolute top-0 left-0 m-4 bg-black/80 p-2 rounded-full">
          <MediaTypeIcon
            media_type={mediaReview.media_type}
            className="text-white"
          />
        </div>
        <div
          className={clsx(
            "w-full p-4 text-white z-20 flex justify-between items-end",
            mediaReview.signed_cover_image
              ? "absolute bottom-0 left-0"
              : "bg-black rounded-t-2xl"
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
          <p className="text-5xl ml-4">{mediaReview.rating}</p>
        </div>
        <Link
          className="btn absolute right-0 top-0 m-4"
          href={`/MediaReviewsV2/Edit?id=${mediaReview.id}`}
        >
          <MdEdit />
        </Link>
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex justify-between">
          <div>
            {mediaReview.creator && (
              <p>
                <span className="font-bold">{creatorTitle}</span>{" "}
                {mediaReview.creator}
              </p>
            )}
            {mediaReview.run_time && (
              <p>
                <span className="font-bold">Run Time</span>{" "}
                {mediaReview.run_time} min
              </p>
            )}
            {mediaReview.word_count && (
              <p>
                <span className="font-bold">Word Count:</span>{" "}
                {mediaReview.word_count?.toLocaleString()}
              </p>
            )}
          </div>
          {mediaReview.consumed_date && (
            <p className="ml-4">
              <span className="font-bold">Consumed</span>{" "}
              {consumedDate?.toLocaleDateString("en-AU", {
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2">
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

      {mediaReview.review_content && (
        <div
          className="editor"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(mediaReview.review_content),
          }}
        />
      )}
      {mediaReview.review_last_update_date && (
        <p className="text-xs italic ml-auto mb-2 mr-4 mt-auto">
          Updated{" "}
          {new Date(mediaReview.review_last_update_date).toLocaleDateString()}{" "}
          {new Date(mediaReview.review_last_update_date).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default MediaReviewCard;
