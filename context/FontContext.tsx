// context/FontContext.tsx
import { useTheme } from "next-themes";
import { NextFont } from "next/dist/compiled/@next/font";
import {
  Roboto,
  Open_Sans,
  Montserrat,
  Lora,
  Rajdhani,
  Josefin_Sans,
  Inconsolata,
} from "next/font/google";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { themesList } from "@components/ToggleThemeButton";

// Define fonts
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

const josefin_sans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// List of fonts
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
  {
    name: "josefin_sans",
    font: josefin_sans,
  },
  {
    name: "inconsolata",
    font: inconsolata,
  },
];

type FontContextType = {
  font: NextFont;
  setFont: (fontName: string) => void;
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [font, setFont] = useState(roboto); // Default to roboto

  useEffect(() => {
    // Get the font based on the current theme after hydration
    const theme_font = themesList.find((t) => t.name === theme)?.font;
    const new_font =
      fonts_list.find((f) => f.name === theme_font)?.font ?? roboto;
    setFont(new_font);
  }, [theme]);

  const handleFontChange = (fontName: string) => {
    const newFont = fonts_list.find((f) => f.name === fontName)?.font ?? roboto;
    setFont(newFont);
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
