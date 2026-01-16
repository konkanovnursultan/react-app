import { PaginationProps } from "./model/pagination";
import "./index.scss";

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <main className="pagination flex flex-row items-center justify-end">
      <nav className="pagination__wrapper flex flex-row items-center justify-center">
        {pages.map((p) => (
          <button
            key={p}
            className={
              p === page
                ? "pagination__wrapper-item pagination__wrapper-item--active Small"
                : "pagination__wrapper-item Small"
            }
            onClick={() => onChange(p)}
            disabled={p === page}
          >
            {p}
          </button>
        ))}
      </nav>
    </main>
  );
};
