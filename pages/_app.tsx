import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import { Nunito } from "next/font/google";
import { AuthProvider } from "../components/AuthContext";

const queryClient = new QueryClient();

const inter = Nunito({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={true} attribute="class">
          <main className={`${inter.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
        <Analytics />
      </QueryClientProvider>
    </AuthProvider>
  );
}
