import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ToggleThemeButton = () => {
  // Switching between dark and light themes
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  // useEffect only runs on the client so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    if (currentTheme === "dark") {
      setTheme("light");
      return "light";
    } else {
      setTheme("dark");
      return "dark";
    }
  }

  return (
    <button
      className=" hover:bg-blue-100 dark:hover:bg-black p-2 rounded-md"
      onClick={() => {
        toggleTheme();
      }}
    >
      {currentTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default ToggleThemeButton;
