import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MediaReview } from "shared/validations/MediaReviewSchemas";
import MediaReviewCard from "./MediaReviewCard";

interface MediaReviewModalProps {
  review?: MediaReview;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  showImages: boolean;
}

const MediaReviewModal: React.FC<MediaReviewModalProps> = ({
  review,
  visible,
  setVisible,
  showImages,
}) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = 0;
    }
  }, [review]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, setVisible]);
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <div
        className="fixed inset-0 bg-black/70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="flex flex-col z-10 px-4 w-full md:px-8 lg:w-4/5 2xl:w-3/5 max-h-[83%] overflow-hidden rounded-2xl">
        <div
          ref={scrollDivRef}
          className="overflow-y-auto rounded-2xl relative"
        >
          <button
            className="btn z-50 m-4 fixed"
            onClick={() => {
              setVisible(false);
            }}
          >
            <AiOutlineClose />
          </button>

          {review && (
            <MediaReviewCard
              className="w-full"
              review={review}
              index={0}
              key={review.id}
              minimised={false}
              showImages={showImages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaReviewModal;
