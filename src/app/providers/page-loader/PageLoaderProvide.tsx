import { createContext, useContext, useRef, useState } from "react";
import { PageLoader } from "@/shared/ui/PageLoaderUi";

interface PageLoaderContextValue {
  show: () => void;
  hide: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextValue | null>(null);

const MIN_DURATION = 900;

export const PageLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const startTimeRef = useRef<number | null>(null);

  const show = () => {
    startTimeRef.current = Date.now();
    setIsRendered(true);
    setIsActive(true);
  };

  const hide = () => {
    const elapsed = Date.now() - (startTimeRef.current ?? 0);
    const delay = Math.max(MIN_DURATION - elapsed, 0);

    setTimeout(() => {
      setIsActive(false);
    }, delay);
  };

  const handleExitComplete = () => {
    setIsRendered(false);
  };

  return (
    <PageLoaderContext.Provider value={{ show, hide }}>
      {children}

      {isRendered && (
        <PageLoader active={isActive} onExitComplete={handleExitComplete} />
      )}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => {
  const ctx = useContext(PageLoaderContext);
  if (!ctx) {
    throw new Error("usePageLoader must be used inside PageLoaderProvider");
  }
  return ctx;
};
