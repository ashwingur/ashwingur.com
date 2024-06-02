import { Listbox } from "@headlessui/react";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import clsx from "clsx";

interface LanguageSelectorProps {
  languages: LanguageType[];
  selectedLanguage: LanguageType;
  onSelectedLanguageChange: (value: LanguageType) => void;
  className?: string; // Add className prop
}

const LanguageSelector = ({
  languages,
  selectedLanguage,
  onSelectedLanguageChange,
  className,
}: LanguageSelectorProps) => {
  return (
    <div className={clsx("relative", className)}>
      <Listbox value={selectedLanguage} onChange={onSelectedLanguageChange}>
        <div className="cursor-default overflow-hidden rounded-lg bg-white dark:bg-zinc-900 text-left focus:outline-none w-60 py-2 px-4 justify-between">
          <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
            {selectedLanguage.displayName}
            <AiOutlineDown className="text-gray-600 dark:text-gray-300 hover:text-xl transition-all" />
          </Listbox.Button>
        </div>
        <Listbox.Options className="absolute z-50 bg-white dark:bg-zinc-900 rounded-lg w-60 mt-1 max-h-60 overflow-auto">
          {languages.map((language, index) => (
            <Listbox.Option
              key={index}
              value={language}
              className={({ active }) =>
                `px-4 cursor-pointer py-2 ${
                  active ? "bg-green-600 dark:bg-[#3b0764] text-white " : ""
                }`
              }
            >
              {language.displayName}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default LanguageSelector;
