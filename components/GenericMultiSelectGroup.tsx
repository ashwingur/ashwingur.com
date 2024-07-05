import clsx from "clsx";
import React, { useId } from "react";
import Select, { MultiValue, GroupBase } from "react-select";
import makeAnimated from "react-select/animated";

/*
    Generic multi select component that uses react select
    Supports both groups and ungrouped options
*/

interface OptionType {
  value: string;
  label: string;
}

interface GroupedOptionType<T> extends GroupBase<T> {
  label: string;
  options: T[];
}

interface GenericMultiSelectGroupProps<T> {
  options: T[] | GroupedOptionType<T>[];
  value: T[];
  onChange: (selectedOptions: MultiValue<T>) => void;
  className?: string;
  displayKey: keyof T;
  bgClass?: string;
}

const animatedComponents = makeAnimated();

const GenericMultiSelectGroup = <T extends OptionType>({
  options,
  value,
  onChange,
  className,
  displayKey,
  bgClass = "bg-background-muted",
}: GenericMultiSelectGroupProps<T>) => {
  const formatOption = (option: T) => ({
    value: option,
    label: option[displayKey] as unknown as string,
  });

  const formattedOptions =
    Array.isArray(options) && options.length > 0 && "options" in options[0]
      ? (options as GroupedOptionType<T>[]).map((group) => ({
          ...group,
          options: group.options.map(formatOption),
        }))
      : (options as T[]).map(formatOption);

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
      hideSelectedOptions={true}
      options={formattedOptions}
      instanceId={useId()}
      value={value.map(formatOption)}
      onChange={handleChange}
      placeholder="Select genres"
      className={className}
      classNames={{
        control: (state) =>
          clsx(
            bgClass,
            "border-1 rounded-2xl px-4 py-1 md:py-1",
            state.isFocused ? "border-text-muted" : ""
          ),
        option: ({ isFocused, isSelected }) =>
          clsx(
            "pl-2 py-2",
            isFocused && " bg-accent text-text-accent",
            isSelected && "bg-accent text-text-accent",
            !isFocused && !isSelected && bgClass
          ),
        noOptionsMessage: () =>
          clsx(bgClass, "shadow-lg mt-2 text-lg py-2 rounded-lg"),
        menu: () => "mt-2 rounded-lg",
        menuList: () => "shadow-lg max-h-56 rounded-lg",
        multiValue: () =>
          "bg-secondary text-text-secondary rounded-md mx-2 my-1 text-base",
        multiValueLabel: () => "ml-2 mr-1 py-[2px]",
        multiValueRemove: () =>
          "hover:bg-secondary-hover transition-all px-2 py-[6px] rounded-r-md",
        placeholder: () => "text-text-muted py-[6px]",
        groupHeading: () => clsx(bgClass, "font-bold pl-2 py-2 text-xl"),
        clearIndicator: () =>
          "cursor-pointer text-text-muted hover:text-text transition-all mr-1 after:content-[''] after:w-[1px] after:bg-text-muted after:ml-1",
        dropdownIndicator: () => "cursor-pointer",
      }}
    />
  );
};

export default GenericMultiSelectGroup;
