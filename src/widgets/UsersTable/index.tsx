import { UsersTableProps } from "./model/table";
import { FormatDate } from "@/shared/lib/date";
import { TrashButton } from "@/shared/ui/TrashButtonUI";
import { EditUserButton } from "@/shared/ui/EditButtonUI";
import { useDeleteModal } from "../DeleteModal/DeleteModalProvider";
import { usersApi } from "@/shared/api";
import { useRequestLoader } from "@/app/providers/request-loader/RequestLoaderProvider";
import { useToaster } from "../Toaster/ToasterProvider";
import "./index.scss";

export const UsersTable = ({
  mode,
  users,
  onEdit,
  onDeleteSuccess,
}: UsersTableProps) => {
  const deleteModal = useDeleteModal();
  const requestLoader = useRequestLoader();
  const toaster = useToaster();

  const handleDelete = (userId: number) => {
    deleteModal.open({
      onConfirm: async () => {
        try {
          requestLoader.start();
          await usersApi.deleteUser(userId);
          requestLoader.finish();

          toaster.show("Пользователь успешно удалён!", "success");
          onDeleteSuccess?.();
        } catch {
          requestLoader.finish();
          toaster.show("Произошла ошибка при удалении, попробуйте еще!");
        }
      },
    });
  };

  return (
    <main className="table__wrapper flex flex-col items-center justify-start">
      {/* TABLE TITLES */}
      <section className="table__wrapper-titles grid">
        <div className="table__wrapper-id flex items-start justify-start Small">
          ID
        </div>
        <div className="table__wrapper-col flex items-start justify-start Small">
          Имя
        </div>
        <div className="table__wrapper-col flex items-start justify-start Small">
          Фамилия
        </div>
        <div className="table__wrapper-email flex items-start justify-start Small">
          Email
        </div>
        <div className="table__wrapper-date flex items-start justify-start Small">
          Дата
        </div>
        <div className="table__wrapper-skills_title flex items-start justify-start Small">
          Навыки
        </div>
        <div className="table__wrapper-action flex items-start justify-start" />
      </section>
      {/* TABLE BODY */}
      <section className="table__wrapper-body flex flex-col items-center justify-start">
        {users.map((user) => (
          <div key={user.id} className="table__wrapper-body_row grid">
            <div className="table__wrapper-id flex items-start justify-start Small">
              {user.id}
            </div>
            <div className="table__wrapper-col flex items-start justify-start Small">
              {user.name}
            </div>
            <div className="table__wrapper-col flex items-start justify-start Small">
              {user.surname}
            </div>
            <div className="table__wrapper-email flex items-start justify-start Small">
              {user.email}
            </div>
            <div className="table__wrapper-date flex items-start justify-start Small">
              {FormatDate(user.createdAt)}
            </div>
            <div className="table__wrapper-skills flex wrap items-start justify-start">
              {user.skills.map((skill) => (
                <div
                  key={skill}
                  className="table__wrapper-skill flex items-center justify-center Small"
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className="table__wrapper-action flex items-center justify-center">
              {mode === "edit" ? (
                <EditUserButton onClick={() => onEdit?.(user.id)} />
              ) : (
                <TrashButton onClick={() => handleDelete(user.id)} />
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
