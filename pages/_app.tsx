import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import { Nunito } from "next/font/google";
import { AuthProvider } from "@context/AuthContext";

const queryClient = new QueryClient();

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={true} attribute="data-theme">
          <main className={`${nunito.variable} font-sans`}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
        <Analytics />
      </QueryClientProvider>
    </AuthProvider>
  );
}
