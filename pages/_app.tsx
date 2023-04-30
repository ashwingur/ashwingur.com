import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import AppContext from "../components/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import { Nunito } from "@next/font/google";

const queryClient = new QueryClient();

const inter = Nunito({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{}}>
        <ThemeProvider enableSystem={true} attribute="class">
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </AppContext.Provider>
      <Analytics />
    </QueryClientProvider>
  );
}
