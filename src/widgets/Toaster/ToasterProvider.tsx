import { createContext, useContext, useState } from "react";
import { Toast } from "./Toast";
import "./index.scss";

export type ToastType = "error" | "success";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterContextValue {
  show: (message: string, type?: ToastType) => void;
}

const ToasterContext = createContext<ToasterContextValue | null>(null);

export const ToasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = (message: string, type: ToastType = "error") => {
    setToasts((prev) => [...prev, { id: crypto.randomUUID(), message, type }]);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ show }}>
      {children}
      <div className="toaster__wrapper fixed flex flex-col items-start justify-start">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => remove(toast.id)} />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const ctx = useContext(ToasterContext);
  if (!ctx) {
    throw new Error("useToaster must be used inside ToasterProvider");
  }
  return ctx;
};
