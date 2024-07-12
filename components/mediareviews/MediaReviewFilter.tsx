import Card from "@components/Card";
import GenericListbox, { ListboxOption } from "@components/GenericListBox";
import GenericMultiSelectGroup from "@components/GenericMultiSelectGroup";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { OptionType } from "shared/mediareview-genres";
import { useReviewsMetadata } from "shared/queries/mediareviews";

export interface FilterObject {
  mediaTypes: string[];
  orderBy: string;
  genres: string[];
  creators: string[];
}

interface MediaReviewFilterProps {
  setFilterObject: React.Dispatch<React.SetStateAction<FilterObject>>;
  noResults: boolean;
  className?: string;
}

const mediaOptions: OptionType[] = [
  { label: "Movie", value: "Movie" },
  { label: "Book", value: "Book" },
  { label: "Show", value: "Show" },
  { label: "Game", value: "Game" },
  { label: "Music", value: "Music" },
];

const orderByOptions: ListboxOption[] = [
  { label: "A – Z", value: "name_asc" },
  { label: "Z – A", value: "name_desc" },
  { label: "Highest Rating", value: "rating_desc" },
  { label: "Lowest Rating", value: "rating_asc" },
  { label: "Earliest Creation Date", value: "media_creation_asc" },
  { label: "Latest Creation Date", value: "media_creation_desc" },
  { label: "Most Words", value: "word_count_desc" },
  { label: "Least Words", value: "word_count_asc" },
];

export const defaultFilterObject: FilterObject = {
  mediaTypes: [],
  orderBy: orderByOptions[0].value,
  genres: [],
  creators: [],
};

const MediaReviewFilter: React.FC<MediaReviewFilterProps> = ({
  setFilterObject,
  noResults,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<OptionType[]>(
    []
  );
  const [selectedGenres, setSelectedGenres] = useState<OptionType[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<OptionType[]>([]);
  const [selectedOrderByOption, setSelectedOrderByOption] =
    useState<ListboxOption>(orderByOptions[0]);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data, isLoading, isError } = useReviewsMetadata();

  const genreOptions: OptionType[] = data
    ? data.genres.map((g) => ({ label: g.name, value: g.name }))
    : [];
  const creatorOptions: OptionType[] = data
    ? data.creators.map((c) => ({ label: c, value: c }))
    : [];

  // Filter out the selected options
  const filteredGenreOptions = genreOptions.filter(
    (option) =>
      !selectedGenres.some((selected) => selected.value === option.value)
  );
  const filteredCreatorOptions = creatorOptions.filter(
    (option) =>
      !selectedCreators.some((selected) => selected.value === option.value)
  );

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
          "transition-all origin-top w-80 sm:w-[30rem] lg:w-[36rem] !absolute z-30 bottom-0 translate-y-full"
        )}
      >
        <Card firstLayer={false}>
          <p className="mt-2 ml-2 font-bold">Media Type</p>
          <GenericMultiSelectGroup
            className="z-20"
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
          <p className="mt-2 ml-2 font-bold">Order By</p>
          <GenericListbox
            className="z-[19]"
            bgClass="bg-background-muted"
            maxHeightClass="max-h-96"
            widthClass="w-full"
            shadowClass=""
            roundingClass="rounded-2xl"
            options={orderByOptions}
            selectedValue={selectedOrderByOption}
            displayValue={(o) => o.label}
            onSelectedValueChange={(v) => {
              setSelectedOrderByOption(v);
              setFilterObject((prev) => ({
                ...prev,
                orderBy: v.value,
              }));
            }}
          />
          <p className="mt-2 ml-2 font-bold">Genre</p>
          <GenericMultiSelectGroup
            className="z-[18]"
            options={filteredGenreOptions}
            value={selectedGenres}
            onChange={(selectedOptions) => {
              setSelectedGenres([...selectedOptions]);
              setFilterObject((prev) => ({
                ...prev,
                genres: [...selectedOptions]
                  .sort((a, b) => a.value.localeCompare(b.value)) // Sorting to reduce query key combinations
                  .map((m) => m.value),
              }));
            }}
            displayKey={"label"}
            placeholder="Genres"
          />
          <p className="mt-2 ml-2 font-bold">Creator</p>
          <GenericMultiSelectGroup
            className="z-[17]"
            options={filteredCreatorOptions}
            value={selectedCreators}
            onChange={(selectedOptions) => {
              setSelectedCreators([...selectedOptions]);
              setFilterObject((prev) => ({
                ...prev,
                creators: [...selectedOptions]
                  .sort((a, b) => a.value.localeCompare(b.value)) // Sorting to reduce query key combinations
                  .map((m) => m.value),
              }));
            }}
            displayKey={"label"}
            placeholder="Creators"
          />

          {noResults && (
            <p className="text-center text-error mt-4 text-lg">No Results</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MediaReviewFilter;
