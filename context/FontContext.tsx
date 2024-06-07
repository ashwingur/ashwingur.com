// context/FontContext.tsx
import { useTheme } from "next-themes";
import { NextFont } from "next/dist/compiled/@next/font";
import {
  Roboto,
  Open_Sans,
  Montserrat,
  Lora,
  Rajdhani,
} from "next/font/google";
import { createContext, useContext, useState, ReactNode } from "react";
import { themesList } from "@components/ToggleThemeButton";

// The user can select there fonts using the setFont hook, if the given font doesnt exist it falls back to a default option

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const lora = Lora({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const fonts_list: { name: string; font: NextFont }[] = [
  {
    name: "roboto",
    font: roboto,
  },
  {
    name: "open_sans",
    font: openSans,
  },
  {
    name: "montserrat",
    font: montserrat,
  },
  {
    name: "lora",
    font: lora,
  },
  {
    name: "rajdhani",
    font: rajdhani,
  },
];

type FontContextType = {
  font: NextFont;
  setFont: (fontName: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const theme_font = themesList.find((t) => t.name === theme)?.font;
  const starting_font =
    fonts_list.find((f) => f.name === theme_font)?.font ?? roboto;
  const [font, setFont] = useState(starting_font);
  console.log(`font is ${JSON.stringify(font)}, theme is ${theme}`);

  const handleFontChange = (fontName: string) => {
    setFont(fonts_list.find((f) => f.name == fontName)?.font ?? roboto);
  };

  return (
    <FontContext.Provider value={{ font, setFont: handleFontChange }}>
      <div className={font.className}>{children}</div>
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};
