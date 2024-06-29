import clsx from "clsx";
import React, { useId } from "react";
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
  bgClass?: string;
}

const animatedComponents = makeAnimated();

const GenericMultiSelect = <T extends OptionType>({
  options,
  value,
  onChange,
  className,
  displayKey,
  bgClass = "bg-background-muted",
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
      hideSelectedOptions={true}
      options={formattedOptions}
      instanceId={useId()}
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
            bgClass,
            "border-1 rounded-full px-4 py-1 md:py-1",
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
          "bg-background-muted shadow-lg mt-2 border-2 border-black",
        menu: () => " mt-2 rounded-lg",
        menuList: () => "shadow-lg max-h-56 rounded-lg",
        multiValue: () =>
          "bg-secondary text-text-secondary px-2 rounded-md mx-2 my-1 py-[2px] text-base",
        multiValueLabel: () => "mr-1",
        placeholder: () => "text-text-muted",
      }}
    />
  );
};

export default GenericMultiSelect;
