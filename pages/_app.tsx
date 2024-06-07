import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@context/AuthContext";
import { FontProvider } from "@context/FontContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={true} attribute="data-theme">
          <FontProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </FontProvider>
        </ThemeProvider>
        <Analytics />
      </QueryClientProvider>
    </AuthProvider>
  );
}
