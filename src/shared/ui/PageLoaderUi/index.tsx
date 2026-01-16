import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./index.scss";

interface PageLoaderProps {
  active: boolean;
  onExitComplete: () => void;
}

export const PageLoader = ({ active, onExitComplete }: PageLoaderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (active) {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: "sine.inOut" }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.24,
        ease: "sine.inOut",
        onComplete: onExitComplete,
      });
    }
  }, [active]);

  return (
    <main
      ref={ref}
      className="page__loader fixed flex items-center justify-center"
    >
      <div className="page__loader-spinner" />
    </main>
  );
};
