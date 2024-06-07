import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSun, FaMoon, FaFire } from "react-icons/fa";
import { FaGun } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import clsx from "clsx";

interface ThemeType {
  name: string;
  displayName: string;
  isDark: boolean;
  color: string;
  icon: (className?: string) => JSX.Element;
}

const themes: ThemeType[] = [
  {
    name: "light",
    displayName: "Light",
    isDark: false,
    color: "text-yellow-500",
    icon: (className?: string) => <MdSunny className={clsx(className)} />,
  },
  {
    name: "dark",
    displayName: "Dark",
    color: "text-gray-800",
    isDark: true,
    icon: (className?: string) => <FaMoon className={clsx(className)} />,
  },
  {
    name: "fire",
    displayName: "Fire",
    color: "text-orange-500",
    isDark: false,
    icon: (className?: string) => <FaFire className={clsx(className)} />,
  },
  {
    name: "cyberpunk",
    displayName: "Cyberpunk",
    color: "text-purple-500",
    isDark: true,
    icon: (className?: string) => <FaGun className={clsx(className)} />,
  },
];

interface ToggleThemeButtonProps {
  className?: string;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({ className }) => {
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
        <Combobox.Button
          className={clsx(
            "inline-flex justify-center w-full rounded-md px-4 py-2 focus:outline-none hover:bg-background-hover transition-all",
            className
          )}
        >
          {themes.find((t) => t.name === currentTheme)?.icon("") ?? <FaSun />}
        </Combobox.Button>

        <Combobox.Options
          className={clsx(
            "absolute right-0 w-32 mt-1 shadow-lg max-h-60 rounded-md text-base overflow-auto focus:outline-none sm:text-sm",
            isDark(currentTheme ?? "") ? "bg-stone-700" : "bg-stone-200"
          )}
        >
          {themes.map((theme) => (
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
  return themes.find((t) => t.name === currentTheme)?.isDark ?? false;
};

export { ToggleThemeButton, isDark };
