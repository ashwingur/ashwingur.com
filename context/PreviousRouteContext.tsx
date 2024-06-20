// PreviousRouteContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";

interface PreviousRouteContextType {
  previousRoute: string | null;
  setPreviousRoute: (route: string) => void;
}

const PreviousRouteContext = createContext<
  PreviousRouteContextType | undefined
>(undefined);

export const PreviousRouteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPreviousRoute(router.asPath);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <PreviousRouteContext.Provider value={{ previousRoute, setPreviousRoute }}>
      {children}
    </PreviousRouteContext.Provider>
  );
};

export const usePreviousRoute = () => {
  const context = useContext(PreviousRouteContext);
  if (context === undefined) {
    throw new Error(
      "usePreviousRoute must be used within a PreviousRouteProvider"
    );
  }
  return context;
};
