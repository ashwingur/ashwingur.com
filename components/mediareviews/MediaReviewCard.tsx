import clsx from "clsx";
import { MediaReview } from "shared/validations/MediaReviewSchemas";
import Link from "next/link";
import MediaTypeIcon from "./MediaTypeIcon";
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import DOMPurify from "dompurify";
import FixedImageContainer from "./FixedImageContainer";
import SubMediaReviewCard from "./SubMediaReviewCard";

interface MediaReviewCardProps {
  review: MediaReview;
  index: number;
  className?: string;
}

const MediaReviewCard: React.FC<MediaReviewCardProps> = ({
  className,
  index,
  review,
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
      <div className="mt-1">
        <IoMdCheckmark />
      </div>
      <p>{pro}</p>
    </li>
  ));
  const cons = review.cons.map((con, index) => (
    <li key={index} className="flex gap-2">
      <div className="mt-1">
        <IoMdClose />
      </div>
      {con}
    </li>
  ));

  let creatorTitle = "Creator";
  switch (review.media_type) {
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

  const subReviewCards = review.sub_media_reviews
    .sort((a, b) => a.display_index - b.display_index)
    .map((subReview) => (
      <SubMediaReviewCard
        key={review.id}
        parentIndex={index}
        review={subReview}
      />
    ));

  return (
    <div
      className={clsx(
        "rounded-2xl shadow-xl bg-background-muted flex flex-col",
        className
      )}
    >
      <div className="w-full relative overflow-hidden">

        <div className="overflow-hidden rounded-t-2xl">
          <FixedImageContainer
            imageSrc={review.signed_cover_image ?? undefined}
            imageAlt={`Main review cover image of ${review.name}`}
            priorityLoad={index < 2}
            bgColour={review.cover_image_bg_colour ?? ""}
          />
        </div>

        <div className="absolute top-0 left-0 m-4 bg-black/80 p-2 rounded-full">
          <MediaTypeIcon
            media_type={review.media_type}
            className="text-white"
          />
        </div>
        <div
          className={clsx(
            "w-full p-4 text-white z-20 flex justify-between items-end pointer-events-none absolute bottom-0 left-0",
            // review.signed_cover_image
            //   ? "absolute bottom-0 left-0"
            //   // Also add a black gradient on top of plain bg colour if there's no cover image
            //   : `rounded-t-2xl h-80`
          )}
        // style={review.signed_cover_image ? {} : { backgroundColor: review.cover_image_bg_colour ?? "#000000" }}
        >
          <div className="z-10">
            {review.media_creation_date && (
              <p className="font-mono tracking-widest text-lg">
                {new Date(review.media_creation_date).getFullYear()}
              </p>
            )}
            <p>{review.genres.map((g) => g.name).join(", ")}</p>
            <p className="text-2xl lg:text-3xl font-bold">{review.name}</p>
          </div>
          <p className="text-4xl lg:text-5xl ml-8">{review.rating}</p>
        </div>
        <Link
          className="btn !absolute right-0 top-0 m-4"
          href={`/MediaReviewsV2/Edit?id=${review.id}`}
        >
          <MdEdit />
        </Link>
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex justify-between">
          <div>
            {review.creator && (
              <p>
                <span className="font-bold">{creatorTitle}</span>{" "}
                {review.creator}
              </p>
            )}
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
              {formattedConsumedDate}
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

      {review.review_content && (
        <div
          className="editor px-4 py-2"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(review.review_content),
          }}
        />
      )}
      {subReviewCards.length > 0 && (
        <h2 className="text-center">Sub Reviews</h2>
      )}
      <div className="flex flex-col m-4 gap-8">{subReviewCards}</div>
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

export default MediaReviewCard;
