import { DeleteIcon } from "../icons/DeleteIcon";
import "./index.scss";

interface Props {
  onClick: () => void;
}

export const DeleteUserButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="delete__wrapper flex flex-row items-center justify-center"
    >
      <div className="delete__wrapper-icon flex items-center justify-center">
        <DeleteIcon />
      </div>
      <span className="XS">Удаление</span>
    </button>
  );
};
