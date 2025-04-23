// PreviousRouteContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
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

const postCurrentRoute = async (route: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/analytics/frontend_visits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ route }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Failed to track route:", error);
  }
};

export const PreviousRouteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);
  const currentPathRef = useRef(router.asPath);

  // Run only on first mount
  useEffect(() => {
    postCurrentRoute(router.asPath);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const nextPathname = new URL(url, window.location.href).pathname;

      // Set the current path as previous before changing
      setPreviousRoute(currentPathRef.current);
      console.log(`Previous route is ${currentPathRef.current}`);

      // Track next route
      postCurrentRoute(nextPathname);

      // Update the ref to the new current route
      currentPathRef.current = nextPathname;
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
      "usePreviousRoute must be used within a PreviousRouteProvider",
    );
  }
  return context;
};
