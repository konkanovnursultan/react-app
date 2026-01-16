import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./index.scss";

interface Props {
  done: boolean;
  onFinish: () => void;
}

export const RequestLoader = ({ done, onFinish }: Props) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { width: "0vw" },
      {
        width: "36vw",
        duration: 0.24,
        ease: "sine.inOut",
      }
    );
  }, []);

  useEffect(() => {
    if (!done) return;

    gsap.to(barRef.current, {
      width: "100vw",
      duration: 0.48,
      ease: "sine.inOut",
      onComplete: () => {
        gsap.to(barRef.current, {
          opacity: 0,
          duration: 0.12,
          onComplete: onFinish,
        });
      },
    });
  }, [done]);

  return <div ref={barRef} className="request__loader fixed" />;
};
