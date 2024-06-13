import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { GiAnglerFish, GiPistolGun, GiTropicalFish } from "react-icons/gi";
import { FaBug, FaFishFins } from "react-icons/fa6";
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
            "absolute w-56 lg:text-lg mt-1 shadow-lg max-h-80 rounded-md text-base overflow-auto focus:outline-none sm:text-sm z-50 ",
            isDark(currentTheme ?? "") ? "shadow-background-hover" : "",
            centerOptions
              ? "-translate-x-[5.5rem] bg-background-hover"
              : "right-0 bg-background-muted"
          )}
        >
          {themesList.map((theme) => (
            <Combobox.Option
              key={theme.name}
              value={theme.name}
              className={({ active }) =>
                `cursor-default select-none ${
                  active ? "text-text-accent bg-accent" : ""
                }`
              }
            >
              {({ selected, active }) => (
                <div
                  className={clsx(
                    "flex items-center justify-between hover:text-white group px-2 py-1",
                    active ? "text-white" : theme.color
                  )}
                >
                  <div className="bg-black rounded-full p-2">
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

const isDark = (currentTheme: string): boolean => {
  return themesList.find((t) => t.name === currentTheme)?.isDark ?? false;
};

export { ToggleThemeButton, isDark, themesList };
