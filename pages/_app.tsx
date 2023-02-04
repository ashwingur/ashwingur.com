import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import AppContext from "../components/AppContext";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={{}}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
