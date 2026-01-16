import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export const Portal = ({ children }: Props) => {
  return createPortal(children, document.body);
};
