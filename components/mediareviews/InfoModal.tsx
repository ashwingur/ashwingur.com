import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Card from "@components/Card";
import MediaTypeIcon from "./MediaTypeIcon";

interface InfoModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, setVisible }) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = 0;
    }
  }, [visible]);

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
          <Card firstLayer={true} className="!px-8">
            <p className="mt-10">
              This site contains a comprehensive catalogue of media I have
              consumed over the years. They are rated from 0-10 and further
              details are available by clicking on the review, which also shows
              all the sub-reviews (if it&apos;s a series for example).
            </p>
            <p className="mt-4">
              I have also created a comprehensive filtering system that allows
              for searching by name, media type, genre, creator and ordering the
              results. I currently have 5 media types available:
            </p>
            <div className="mt-2 flex flex-col items-center gap-2">
              {["Movie", "Book", "Show", "Game", "Music"].map((m, index) => (
                <div key={index} className="flex items-center gap-2">
                  <MediaTypeIcon media_type={m} className="text-2xl" />

                  <p>{m}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Furthermore, there is a statistics tab where you can see
              interesting information such as number of reviews, total word
              count, total run time and rating distributions by media type.
            </p>
            <p className="mt-4">
              I am continously adding and updating my reviews so be sure to take
              a look at anything new I add!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
