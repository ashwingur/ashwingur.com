import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import clsx from "clsx";

const themes = [
  {
    name: "light",
    color: "text-yellow-500",
    icon: (additionalClasses: string) => (
      <FaSun className={clsx(additionalClasses)} />
    ),
  },
  {
    name: "dark",
    color: "text-gray-800",
    icon: (additionalClasses: string) => (
      <FaMoon className={clsx(additionalClasses)} />
    ),
  },
  {
    name: "blue",
    color: "text-blue-500",
    icon: (additionalClasses: string) => (
      <MdOutlineColorLens className={clsx(additionalClasses)} />
    ),
  },
  {
    name: "green",
    color: "text-green-500",
    icon: (additionalClasses: string) => (
      <MdOutlineColorLens className={clsx(additionalClasses)} />
    ),
  },
  {
    name: "custom",
    color: "text-purple-500",
    icon: (additionalClasses: string) => (
      <MdOutlineColorLens className={clsx(additionalClasses)} />
    ),
  },
];

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      <Combobox value={currentTheme} onChange={setTheme}>
        <Combobox.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          {themes
            .find((t) => t.name === currentTheme)
            ?.icon(themes.find((t) => t.name === currentTheme)?.color ?? "")}
        </Combobox.Button>

        <Combobox.Options className="absolute mt-1 w-full bg-slate-200 shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {themes.map((theme) => (
            <Combobox.Option
              key={theme.name}
              value={theme.name}
              className={({ active }) =>
                `cursor-default select-none ${
                  active ? "text-white bg-slate-800" : "text-gray-900"
                }`
              }
            >
              {({ selected, active }) => (
                <div
                  className={clsx(
                    "flex justify-center items-center hover:text-white py-2",
                    active ? "text-white" : theme.color
                  )}
                >
                  {theme.icon("w-full h-6")}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default ToggleThemeButton;
