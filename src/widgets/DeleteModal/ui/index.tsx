import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./index.scss";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteModal = ({ onConfirm, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.36, ease: "sine.inOut" }
    );

    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.36, ease: "sine.inOut" }
    );

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, []);

  const close = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.36,
      onComplete: onClose,
    });

    gsap.to(overlayRef.current, { opacity: 0, duration: 0.36 });
  };

  return (
    <main
      ref={overlayRef}
      className="modal__overlay fixed flex items-center justify-center"
    >
      <section
        ref={modalRef}
        className="modal__wrapper flex flex-col items-center justify-between"
      >
        <div className="modal__wrapper-info flex flex-col items-start justify-start">
          <h1 className="modal__wrapper-info_title XL">
            Вы уверены, что хотите удалить?
          </h1>
          <p className="modal__wrapper-info_description Medium">
            После подтверждения данные будут навсегда удалены!
          </p>
        </div>
        <div className="modal__wrapper-actions flex flex-row items-center justify-between">
          <button
            onClick={close}
            className="modal__wrapper-actions_button flex items-center justify-center Small"
          >
            Отменить
          </button>
          <button
            onClick={onConfirm}
            className="modal__wrapper-actions_button flex items-center justify-center Small"
          >
            Удалить
          </button>
        </div>
      </section>
    </main>
  );
};
