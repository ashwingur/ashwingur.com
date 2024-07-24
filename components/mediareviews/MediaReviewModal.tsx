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
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div
        className="fixed inset-0 bg-black/70"
        onClick={() => {
          setVisible(false);
        }}
      />
      <div className="z-10 flex max-h-[83%] w-full flex-col overflow-hidden rounded-2xl px-4 md:px-8 lg:w-4/5 2xl:w-3/5">
        <div
          ref={scrollDivRef}
          className="relative overflow-y-auto rounded-2xl"
        >
          <button
            className="btn fixed z-50 m-4"
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
