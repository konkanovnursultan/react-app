import { createContext, useContext, useState } from "react";
import { Portal } from "@/shared/lib/portal/portal";
import { DeleteModal } from "./ui";

interface OpenParams {
  onConfirm: () => void;
}

interface ContextValue {
  open: (params: OpenParams) => void;
  close: () => void;
}

const DeleteModalContext = createContext<ContextValue | null>(null);

export const DeleteModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  const open = ({ onConfirm }: OpenParams) => {
    setOnConfirm(() => async () => {
      try {
        onConfirm();
      } finally {
        close();
      }
    });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setOnConfirm(null);
  };

  return (
    <DeleteModalContext.Provider value={{ open, close }}>
      {children}

      {isOpen && onConfirm && (
        <Portal>
          <DeleteModal onClose={close} onConfirm={onConfirm} />
        </Portal>
      )}
    </DeleteModalContext.Provider>
  );
};

export const useDeleteModal = () => {
  const ctx = useContext(DeleteModalContext);
  if (!ctx) {
    throw new Error("useDeleteModal must be used inside DeleteModalProvider");
  }
  return ctx;
};
