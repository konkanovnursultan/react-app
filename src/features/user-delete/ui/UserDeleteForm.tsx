import { useForm } from "react-hook-form";
import { usersApi } from "@/shared/api";
import { InputUI } from "@/shared/ui/InputUI/InputUI";
import { useToaster } from "@/widgets/Toaster/ToasterProvider";
import { UserDeleteFormValues } from "../model/menu";
import { useRequestLoader } from "@/app/providers/request-loader/RequestLoaderProvider";
import { useDeleteModal } from "@/widgets/DeleteModal/DeleteModalProvider";
import "./index.scss";

export const UserDeleteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const toaster = useToaster();
  const requestLoader = useRequestLoader();

  const deleteModal = useDeleteModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDeleteFormValues>({
    defaultValues: { id: "" },
    shouldFocusError: false,
  });

  const onValid = ({ id }: UserDeleteFormValues) => {
    const userId = Number(id);

    deleteModal.open({
      onConfirm: async () => {
        try {
          requestLoader.start();
          await usersApi.deleteUser(userId);
          requestLoader.finish();

          toaster.show("Пользователь успешно удалён!", "success");
          onSuccess();
        } catch {
          requestLoader.finish();
          toaster.show("Произошла ошибка при удалении, попробуйте еще!");
        }
      },
    });
  };

  const onInvalid = () => {
    if (errors.id?.type === "pattern") {
      toaster.show("ID должен быть числом");
      return;
    }

    toaster.show("Введите ID пользователя");
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="form__wrapper flex flex-col items-center justify-center"
    >
      <section className="form__wrapper-grid flex items-center justify-center">
        <InputUI
          label="Введите ID Пользователя"
          placeholder="Например, 12"
          error={errors.id?.message}
          {...register("id", {
            required: "ID обязателен",
            pattern: {
              value: /^\d+$/,
              message: "ID должен быть числом",
            },
          })}
        />
      </section>

      <section className="form__wrapper-delete flex flex-row items-center justify-end">
        <button type="submit" className="form__wrapper-delete_button Small">
          Удалить
        </button>
      </section>
    </form>
  );
};
