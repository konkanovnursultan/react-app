import { createContext, useContext, useState } from "react";
import { RequestLoader } from "@/widgets/RequestLoader";

interface ContextValue {
  start: () => void;
  finish: () => void;
}

const RequestLoaderContext = createContext<ContextValue | null>(null);

export const RequestLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  const start = () => {
    setDone(false);
    setVisible(true);
  };

  const finish = () => {
    setDone(true);
  };

  return (
    <RequestLoaderContext.Provider value={{ start, finish }}>
      {children}
      {visible && (
        <RequestLoader done={done} onFinish={() => setVisible(false)} />
      )}
    </RequestLoaderContext.Provider>
  );
};

export const useRequestLoader = () => {
  const ctx = useContext(RequestLoaderContext);
  if (!ctx) {
    throw new Error(
      "useRequestLoader must be used inside RequestLoaderProvider"
    );
  }
  return ctx;
};
