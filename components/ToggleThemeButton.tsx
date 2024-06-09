import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { GiPistolGun } from "react-icons/gi";
import clsx from "clsx";
import { useFont } from "@context/FontContext";

interface ThemeType {
  name: string;
  displayName: string;
  isDark: boolean;
  color: string;
  icon: (className?: string) => JSX.Element;
  font: string;
}

const themesList: ThemeType[] = [
  {
    name: "light",
    displayName: "Light",
    isDark: false,
    color: "text-yellow-500",
    icon: (className?: string) => <MdSunny className={clsx(className)} />,
    font: "roboto",
  },
  {
    name: "dark",
    displayName: "Dark",
    color: "text-gray-800",
    isDark: true,
    icon: (className?: string) => <FaMoon className={clsx(className)} />,
    font: "open_sans",
  },
  {
    name: "fire",
    displayName: "Library Fire",
    color: "text-orange-500",
    isDark: false,
    icon: (className?: string) => <FaFire className={clsx(className)} />,
    font: "lora",
  },
  {
    name: "cyberpunk",
    displayName: "Cyberpunk",
    color: "text-tron-blue",
    isDark: true,
    icon: (className?: string) => (
      <GiPistolGun className={(clsx(className), "text-xl")} />
    ),
    font: "rajdhani",
  },
];

interface ToggleThemeButtonProps {
  className?: string;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ className }) => {
  const { setFont } = useFont();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onThemeChange = (new_theme: string) => {
    setTheme(new_theme ?? "light");
    setFont(themesList.find((t) => t.name === new_theme)?.font ?? "roboto");
  };

  return (
    <div className="relative inline-block text-left">
      <Combobox value={currentTheme} onChange={onThemeChange}>
        <Combobox.Button
          className={clsx(
            "inline-flex justify-center w-full rounded-md px-4 py-2 focus:outline-none hover:bg-background-hover transition-all",
            className
          )}
        >
          {themesList.find((t) => t.name === currentTheme)?.icon("") ?? (
            <FaSun />
          )}
        </Combobox.Button>

        <Combobox.Options
          className={clsx(
            "absolute right-0 w-40 lg:w-40 lg:text-lg mt-1 shadow-lg max-h-60 rounded-md text-base overflow-auto focus:outline-none sm:text-sm",
            isDark(currentTheme ?? "")
              ? "bg-stone-700 shadow-background-hover"
              : "bg-stone-200"
          )}
        >
          {themesList.map((theme) => (
            <Combobox.Option
              key={theme.name}
              value={theme.name}
              className={({ active }) =>
                `cursor-default select-none px-1 ${
                  active ? "text-white bg-stone-800" : "text-gray-900"
                }`
              }
            >
              {({ selected, active }) => (
                <div
                  className={clsx(
                    "flex items-center justify-between hover:text-white group py-2 px-2",
                    active ? "text-white" : theme.color
                  )}
                >
                  {theme.icon("")}{" "}
                  <span
                    className={clsx(
                      isDark(currentTheme ?? "") || active
                        ? "text-slate-200"
                        : "text-slate-800 group-hover:text-white"
                    )}
                  >
                    {theme.displayName}
                  </span>
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

const isDark = (currentTheme: string): boolean => {
  return themesList.find((t) => t.name === currentTheme)?.isDark ?? false;
};

export { ToggleThemeButton, isDark, themesList };
