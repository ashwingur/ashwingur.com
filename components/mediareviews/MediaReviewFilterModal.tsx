import clsx from "clsx";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface MediaReviewFilterModalProps {
  onFilter: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const MediaReviewFilterModal: React.FC<MediaReviewFilterModalProps> = ({
  onFilter,
  visible,
  setVisible,
}) => {
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
      <div className="flex flex-col rounded-lg bg-background-muted z-10 p-4">
        <button
          className="btn self-end"
          onClick={() => {
            setVisible(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <h1 className="text-white mt-2">Filter Modal</h1>
        <p>TODO</p>
      </div>
    </div>
  );
};

export default MediaReviewFilterModal;
