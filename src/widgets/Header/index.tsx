import { Link, useLocation } from "react-router-dom";
import { NavigationItems } from "./model/navigation";
import { FigmaIcon } from "@/shared/ui/icons/FigmaIcon";
import "./index.scss";

export const Header = () => {
  const location = useLocation();
  return (
    <header className="header relative flex flex-row items-center justify-between">
      <nav className="header__navigation flex flex-row items-center justify-around">
        {NavigationItems.map(({ label, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={
                isActive
                  ? "header__navigation-link header__navigation-link--active flex items-center justify-center XS"
                  : "header__navigation-link flex items-center justify-center XS"
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <a
        className="header__figma flex items-center justify-center"
        href="https://www.figma.com/design/g1qBni1io42RsmybHbeLzP/TDS-Media?node-id=0-1&t=Fq5EvL5vdWr68P37-1"
        target="_blank"
        rel="noreferrer"
      >
        <FigmaIcon />
      </a>
    </header>
  );
};
