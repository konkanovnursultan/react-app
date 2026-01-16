import { FilterIcon } from "../icons/FilterIcon";
import "./index.scss";

interface Props {
  onClick: () => void;
}

export const FilterButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="filter__wrapper flex flex-row items-center justify-center"
    >
      <div className="filter__wrapper-icon flex items-center justify-center">
        <FilterIcon />
      </div>
      <span className="XS">Фильтры</span>
    </button>
  );
};
