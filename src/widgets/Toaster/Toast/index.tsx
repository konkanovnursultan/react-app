import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ErrorIcon } from "@/shared/ui/icons/ErrorIcon";
import { SuccessIcon } from "@/shared/ui/icons/SuccessIcon";
import "./index.scss";

interface Props {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { x: "-24vw", opacity: 0 },
      { x: "0vw", opacity: 1, duration: 0.48 }
    );

    const timer = setTimeout(() => {
      gsap.to(ref.current, {
        x: "-24vw",
        opacity: 0,
        duration: 0.48,
        onComplete: onClose,
      });
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      className={`toast__wrapper flex flex-col items-center justify-start toast__wrapper--${type}`}
    >
      <div className="toast__wrapper-icon flex items-center justify-center">
        {type === "error" ? <ErrorIcon /> : <SuccessIcon />}
      </div>
      <p className="toast__wrapper-message Medium">{message}</p>
      <div className="toast__wrapper-loader fixed"></div>
    </div>
  );
};
