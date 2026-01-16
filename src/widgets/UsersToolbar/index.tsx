import { AddUserButton } from "@/shared/ui/AddButtonUI";
import { DeleteUserButton } from "@/shared/ui/DeleteButtonUI";
import { FilterButton } from "@/shared/ui/FilterButtonUI";
import { RemoveIcon } from "@/shared/ui/icons/RemoveIcon";
import "./index.scss";

interface Props {
  mode: "list" | "edit";
  activeFilter?: string | null;
  onAddUser: () => void;
  onDeleteUser: () => void;
  onFilterUser: () => void;
  onResetFilter: () => void;
}

export const UsersToolbar = ({
  mode,
  activeFilter,
  onAddUser,
  onDeleteUser,
  onFilterUser,
  onResetFilter,
}: Props) => {
  return (
    <main className="toolbar__wrapper flex flex-row items-center justify-between">
      <section className="toolbar__wrapper-buttons flex flex-row items-center justify-around">
        {mode === "list" && <AddUserButton onClick={onAddUser} />}
        <DeleteUserButton onClick={onDeleteUser} />
      </section>
      <section className="toolbar__wrapper-filter flex flex-row items-center justify-around">
        {activeFilter && (
          <button
            onClick={onResetFilter}
            className="toolbar__wrapper-filter_remove flex flex-row items-center justify-around XS"
          >
            <div className="toolbar__wrapper-filter_icon flex items-center justify-center">
              <RemoveIcon />
            </div>
            {activeFilter}
          </button>
        )}
        <FilterButton onClick={onFilterUser} />
      </section>
    </main>
  );
};
