import { useEffect, useRef } from "react";
import gsap from "gsap";
import { UserEditForm } from "./UserEditForm";
import { CloseIcon } from "@/shared/ui/icons/CloseIcon";
import { usersStorage } from "@/shared/lib/storage";
import "./index.scss";

interface Props {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const UserEditMenu = ({ userId, onClose, onSuccess }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = usersStorage.getById(userId);
  if (!user) return null;

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, ease: "sine.inOut" },
      { opacity: 1, duration: 0.24, ease: "sine.inOut" }
    );

    gsap.fromTo(
      menuRef.current,
      { y: "100vh" },
      { y: "0vh", duration: 0.48, ease: "sine.inOut" }
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
    gsap.to(menuRef.current, {
      y: "100vh",
      duration: 0.48,
      onComplete: onClose,
      ease: "sine.inOut",
    });

    gsap.to(overlayRef.current, { opacity: 0, duration: 0.24 });
  };

  return (
    <>
      <main
        ref={overlayRef}
        className="menu__overlay fixed flex items-end justify-center"
      >
        <section
          ref={menuRef}
          className="menu__wrapper relative flex items-center justify-center"
        >
          <div className="menu__wrapper-close fixed flex flex-row items-center justify-end">
            <button
              onClick={close}
              className="menu__wrapper-close_button flex items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>
          <UserEditForm user={user} onSuccess={onSuccess} />
        </section>
      </main>
    </>
  );
};
