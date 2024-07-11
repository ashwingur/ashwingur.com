import Card from "@components/Card";
import GenericMultiSelectGroup from "@components/GenericMultiSelectGroup";
import { PreviousRouteProvider } from "@context/PreviousRouteContext";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { OptionType } from "shared/mediareview-genres";

export interface FilterObject {
  mediaTypes: string[];
}

interface MediaReviewFilterProps {
  setFilterObject: React.Dispatch<React.SetStateAction<FilterObject>>;
  className?: string;
}

const mediaOptions: OptionType[] = [
  { label: "Movie", value: "Movie" },
  { label: "Book", value: "Book" },
  { label: "Show", value: "Show" },
  { label: "Game", value: "Game" },
  { label: "Music", value: "Music" },
];

const MediaReviewFilter: React.FC<MediaReviewFilterProps> = ({
  setFilterObject,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<OptionType[]>(
    []
  );
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={className}>
      <button
        ref={btnRef}
        className="btn mb-2"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <IoFilter className="lg:text-xl w-12" />
      </button>
      <div
        ref={ref}
        className={clsx(
          expanded ? "scale-y-100" : "scale-y-0",
          "transition-all origin-top w-80 md:w-96 !absolute z-30 bottom-0 translate-y-full"
        )}
      >
        <Card firstLayer={false}>
          <GenericMultiSelectGroup
            options={mediaOptions}
            value={selectedMediaTypes}
            onChange={(selectedOptions) => {
              setSelectedMediaTypes([...selectedOptions]);
              setFilterObject((prev) => ({
                ...prev,
                mediaTypes: [...selectedOptions]
                  .sort((a, b) => a.value.localeCompare(b.value)) // Sorting to reduce query key combinations
                  .map((m) => m.value),
              }));
            }}
            displayKey={"label"}
            placeholder="Media Types"
          />
        </Card>
      </div>
    </div>
  );
};

export default MediaReviewFilter;
