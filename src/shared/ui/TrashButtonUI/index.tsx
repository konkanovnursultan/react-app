import "./index.scss";
import { TrashIcon } from "@/shared/ui/icons/TrashIcon";

interface Props {
  onClick: () => void;
}

export const TrashButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="TrashButton flex items-center justify-center"
    >
      <TrashIcon />
    </button>
  );
};
