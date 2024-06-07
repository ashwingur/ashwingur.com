import { Listbox } from "@headlessui/react";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import clsx from "clsx";
import { LanguageType } from "../../shared/interfaces/code.interface";

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
        <div className="cursor-default overflow-hidden rounded-lg bg-background-muted text-left focus:outline-none w-60 py-2 px-4 justify-between shadow-sm">
          <Listbox.Button className="w-full rounded-lg focus:outline-none flex items-center justify-between">
            <div>
              {selectedLanguage.displayName}{" "}
              <span className="text-xs text-text-muted">
                ({selectedLanguage.version})
              </span>
            </div>
            <AiOutlineDown className="text-primary hover:text-xl transition-all" />
          </Listbox.Button>
        </div>
        <Listbox.Options className="absolute z-50 bg-background-muted rounded-lg w-60 mt-1 max-h-80 overflow-auto shadow-lg">
          {languages.map((language, index) => (
            <Listbox.Option
              key={index}
              value={language}
              className={({ active }) =>
                `px-4 cursor-pointer py-2 group ${
                  active ? "bg-accent text-text-accent" : ""
                }`
              }
            >
              {language.displayName}{" "}
              <span
                className={clsx(
                  "text-xs group-hover:text-orange-200 text-text-muted"
                )}
              >
                ({language.version})
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default LanguageSelector;
