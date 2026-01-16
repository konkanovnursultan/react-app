import "./index.scss";
import { EditIcon } from "@/shared/ui/icons/EditIcon";

interface Props {
  onClick: () => void;
}

export const EditUserButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="EditButton flex items-center justify-center"
    >
      <EditIcon />
    </button>
  );
};
