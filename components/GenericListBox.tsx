import React from "react";
import { Listbox } from "@headlessui/react";
import { AiOutlineDown } from "react-icons/ai";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa6";

export interface ListboxOption {
  [key: string]: any;
}

interface GenericListboxProps<T> {
  selectedValue: T;
  onSelectedValueChange: (value: T) => void;
  options: T[];
  displayValue: (option: T) => string;
  className?: string;
  maxHeightClass?: string;
  widthClass?: string;
  bgClass?: string;
  shadowClass?: string;
  roundingClass?: string;
}

const GenericListbox = <T,>({
  selectedValue,
  onSelectedValueChange,
  options,
  displayValue,
  className,
  maxHeightClass = "max-h-60",
  widthClass = "w-60",
  bgClass = "bg-background-hover",
  shadowClass = "shadow-md",
  roundingClass = "rounded-lg",
}: GenericListboxProps<T>) => {
  return (
    <div className={clsx("relative", className)}>
      <Listbox value={selectedValue} onChange={onSelectedValueChange}>
        <div
          className={clsx(
            "cursor-default overflow-hiddentext-left focus:outline-none py-2 px-4 mb-2 justify-between",
            bgClass,
            widthClass,
            shadowClass,
            roundingClass
          )}
        >
          <Listbox.Button className="w-full focus:outline-none flex items-center justify-between">
            {displayValue(selectedValue)}
            <FaChevronDown className="hover:text-xl transition-all" />
          </Listbox.Button>
        </div>
        <Listbox.Options
          className={clsx(
            "absolute z-40 shadow-lg mt-0 overflow-auto",
            maxHeightClass,
            bgClass,
            widthClass,
            roundingClass
          )}
        >
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
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
