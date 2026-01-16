import { AddIcon } from "../icons/AddIcon";
import "./index.scss";

interface Props {
  onClick: () => void;
}

export const AddUserButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="add__wrapper flex flex-row items-center justify-center"
    >
      <div className="add__wrapper-icon flex items-center justify-center">
        <AddIcon />
      </div>
      <span className="XS">Добавление</span>
    </button>
  );
};
