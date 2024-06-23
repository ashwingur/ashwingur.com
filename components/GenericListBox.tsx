import React from "react";
import { Listbox } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";
import clsx from "clsx";

interface ListboxOption {
  id: number;
  [key: string]: any;
}

interface GenericListboxProps<T extends ListboxOption> {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  options: T[];
  displayValue: (option: T) => string;
  className?: string;
  maxListBoxHeight?: string;
}

const GenericListbox = <T extends ListboxOption>({
  selectedValue,
  onSelectedValueChange,
  options,
  displayValue,
  className,
  maxListBoxHeight = "max-h-60",
}: GenericListboxProps<T>) => {
  return (
    <div className={clsx("relative", className)}>
      <Listbox value={selectedValue} onChange={onSelectedValueChange}>
        <div className="cursor-default overflow-hidden rounded-lg bg-background-hover text-left focus:outline-none w-60 py-2 px-4 mb-2 justify-between">
          <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
            {displayValue(selectedValue)}
            <AiOutlineDown className="hover:text-xl transition-all" />
          </Listbox.Button>
        </div>
        <Listbox.Options
          className={clsx(
            "absolute z-40 bg-background-muted shadow-lg rounded-lg w-60 mt-1 overflow-auto",
            maxListBoxHeight
          )}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `px-4 cursor-pointer py-2 ${
                  active ? "bg-accent text-text-accent" : ""
                }`
              }
            >
              {displayValue(option)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default GenericListbox;
