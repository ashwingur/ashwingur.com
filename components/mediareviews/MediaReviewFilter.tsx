import Card from "@components/Card";
import GenericMultiSelectGroup from "@components/GenericMultiSelectGroup";
import { PreviousRouteProvider } from "@context/PreviousRouteContext";
import clsx from "clsx";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { OptionType } from "shared/mediareview-genres";

export interface FilterObject {
  mediaTypes: string[];
}

interface MediaReviewFilterProps {
  setFilterObject: React.Dispatch<React.SetStateAction<FilterObject>>;
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
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<OptionType[]>(
    []
  );

  return (
    <div className="fixed ml-8 z-50">
      <button className="btn" onClick={() => setExpanded(!expanded)}>
        <IoFilter />
      </button>
      <Card
        firstLayer={false}
        className={clsx(
          expanded ? "scale-y-100" : "scale-y-0",
          "transition-all origin-top mt-2 w-96"
        )}
      >
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
  );
};

export default MediaReviewFilter;
