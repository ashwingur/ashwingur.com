import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@context/AuthContext";
import { FontProvider } from "@context/FontContext";
import { useRouter } from "next/router";
import { PreviousRouteProvider } from "@context/PreviousRouteContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // Disable the divs from showing in certain routes because they have their own style
  const router = useRouter();
  const currentPath = router.pathname;
  const excluded_base_routes = ["/Tron", "/ClashOfClans"];
  const isExcludedRoute = excluded_base_routes.some((route) =>
    currentPath.startsWith(route)
  );

  return (
    <PreviousRouteProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider enableSystem={true} attribute="data-theme">
            <FontProvider>
              <main>
                <div className="main-top" />
                {!isExcludedRoute && <div className="main-top-2" />}
                <Component {...pageProps} />
                <div className="main-bottom" />
              </main>
            </FontProvider>
          </ThemeProvider>
          <Analytics />
        </QueryClientProvider>
      </AuthProvider>
    </PreviousRouteProvider>
  );
}
