import clsx from "clsx";
import React from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

export interface GenreOption {
  value: string;
  label: string;
}

interface GenreSelectorProps {
  value: GenreOption[];
  onChange: (selectedGenres: MultiValue<GenreOption>) => void;
  className?: string;
}

const animatedComponents = makeAnimated();

const GenreSelector: React.FC<GenreSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  const predefinedGenres: GenreOption[] = [
    { value: "Action", label: "Action" },
    { value: "Drama", label: "Drama" },
    { value: "Comedy", label: "Comedy" },
    { value: "Horror", label: "Horror" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Romance", label: "Romance" },
  ];

  return (
    <Select
      components={animatedComponents}
      isMulti
      unstyled
      options={predefinedGenres}
      value={value}
      onChange={onChange}
      placeholder="Select genres"
      className={className}
      classNames={{
        control: (state) =>
          clsx(
            "border-1 rounded-full px-4 py-1 md:py-2 bg-background-muted",
            state.isFocused ? "border-text-muted" : ""
          ),

        option: ({ isFocused, isSelected }) =>
          clsx(
            "pl-2 py-2",
            isFocused && " bg-accent text-text-accent",
            isSelected && "bg-accent text-text-accent",
            !isFocused && !isSelected && "bg-background-muted"
          ),
        noOptionsMessage: () =>
          "bg-background-muted shadow-lg mt-2 border-2 border-black",
        menu: () => " mt-2 border border-text-muted",
        menuList: () => "shadow-lg max-h-56",
        multiValue: () =>
          "bg-secondary text-text-secondary px-2 rounded-md mx-2 py-[2px]",
        multiValueLabel: () => "mr-1",
      }}
    />
  );
};

export default GenreSelector;
