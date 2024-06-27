import clsx from "clsx";
import React from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps<T> {
  options: T[];
  value: T[];
  onChange: (selectedOptions: MultiValue<T>) => void;
  className?: string;
  displayKey: keyof T;
}

const animatedComponents = makeAnimated();

const GenericMultiSelector = <T extends OptionType>({
  options,
  value,
  onChange,
  className,
  displayKey,
}: MultiSelectProps<T>) => {
  const formattedOptions = options.map((option) => ({
    value: option,
    label: option[displayKey] as unknown as string,
  }));

  const handleChange = (
    selectedOptions: MultiValue<{ value: T; label: string }>
  ) => {
    onChange(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <Select
      components={animatedComponents}
      isMulti
      unstyled
      options={formattedOptions}
      value={value.map((option) => ({
        value: option,
        label: option[displayKey] as unknown as string,
      }))}
      onChange={handleChange}
      placeholder="Select options"
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

export default GenericMultiSelector;
