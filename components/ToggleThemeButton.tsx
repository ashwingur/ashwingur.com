import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { GiAnglerFish, GiPistolGun, GiTropicalFish } from "react-icons/gi";
import { FaBug, FaFishFins } from "react-icons/fa6";
import clsx from "clsx";
import { useFont } from "@context/FontContext";
import { LuCandy } from "react-icons/lu";

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
    color: "text-gray-200",
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
    icon: (className?: string) => <GiPistolGun className={clsx(className)} />,
    font: "rajdhani",
  },
  {
    name: "shallow-reef",
    displayName: "Shallow Reef",
    color: "text-blue-300",
    isDark: false,
    icon: (className?: string) => <FaFishFins className={clsx(className)} />,
    font: "josefin_sans",
  },
  {
    name: "deep-ocean",
    displayName: "Neptune's Abyss",
    color: "text-blue-500",
    isDark: true,
    icon: (className?: string) => <GiAnglerFish className={clsx(className)} />,
    font: "josefin_sans",
  },
  {
    name: "hacker",
    displayName: "Cyber Matrix",
    color: "text-green-500",
    isDark: true,
    icon: (className?: string) => <FaBug className={clsx(className)} />,
    font: "inconsolata",
  },
  {
    name: "minecraft",
    displayName: "Minecraft",
    color: "text-green-400",
    isDark: true,
    icon: (className?: string) => (
      <div className={clsx(className)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.1em"
          height="1.1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z"
          />
        </svg>
      </div>
    ),
    font: "roboto", // Fallback font, there is a minecraft font defined in the css
  },
  // {
  //   name: "chocolate",
  //   displayName: "Chocolate Factory",
  //   color: "text-purple-500",
  //   isDark: false,
  //   icon: (className?: string) => <LuCandy className={clsx(className)} />,
  //   font: "roboto",
  // },
];

interface ToggleThemeButtonProps {
  className?: string;
  centerOptions?: boolean;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
  className,
  centerOptions = false,
}) => {
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
            "inline-flex w-full justify-center rounded-md px-4 py-2 transition-all hover:bg-background-hover focus:outline-none",
            className,
          )}
        >
          {themesList.find((t) => t.name === currentTheme)?.icon("") ?? (
            <FaSun />
          )}
        </Combobox.Button>

        <Combobox.Options
          className={clsx(
            "absolute z-50 mt-1 max-h-80 w-56 overflow-auto rounded-md text-base shadow-lg focus:outline-none sm:text-sm md:max-h-none lg:text-lg",
            isDark(currentTheme ?? "") ? "shadow-background-hover" : "",
            centerOptions
              ? "-translate-x-[5.5rem] bg-background-hover"
              : "right-0 bg-background-muted",
          )}
        >
          {themesList.map((theme) => (
            <Combobox.Option
              key={theme.name}
              value={theme.name}
              className={({ active }) =>
                `cursor-default select-none ${
                  active ? "bg-accent text-text-accent" : ""
                }`
              }
            >
              {({ selected, active }) => (
                <div
                  className={clsx(
                    "group flex items-center justify-between px-2 py-1 hover:text-white",
                    active ? "text-white" : theme.color,
                  )}
                >
                  <div className="rounded-full bg-black p-2">
                    {theme.icon("text-2xl")}
                  </div>
                  <span
                    className={clsx(active ? "text-text-primary" : "text-text")}
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

const isDark = (currentTheme?: string): boolean => {
  return themesList.find((t) => t.name === currentTheme)?.isDark ?? false;
};

export { ToggleThemeButton, isDark, themesList };
