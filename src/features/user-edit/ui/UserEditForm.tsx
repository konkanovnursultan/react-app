import { useForm, Controller } from "react-hook-form";
import { usersApi } from "@/shared/api";
import { InputUI } from "@/shared/ui/InputUI/InputUI";
import { InputSkillsUI } from "@/shared/ui/InputUI/InputSkillsUI";
import { useToaster } from "@/widgets/Toaster/ToasterProvider";
import { UserEditFormValues } from "../model/menu";
import { useRequestLoader } from "@/app/providers/request-loader/RequestLoaderProvider";
import { UserDto } from "@/shared/api";
import "./index.scss";

interface Props {
  user: UserDto;
  onSuccess: () => void;
}

export const UserEditForm = ({ user, onSuccess }: Props) => {
  const toaster = useToaster();
  const requestLoader = useRequestLoader();

  if (!user) {
    toaster.show("Пользователь не найден");
    return null;
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormValues>({
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      skills: user.skills,
    },
    shouldFocusError: false,
  });

  const onValid = async (data: UserEditFormValues) => {
    try {
      requestLoader.start();

      await usersApi.updateUser({
        id: user.id,
        ...data,
      });

      requestLoader.finish();
      toaster.show("Данные успешно сохранены!", "success");
      onSuccess();
    } catch {
      requestLoader.finish();
      toaster.show("Произошла ошибка при отправке, попробуйте еще!");
    }
  };

  const onInvalid = () => {
    if (errors.email?.type === "pattern") {
      toaster.show("Введите корректный email");
      return;
    }

    toaster.show("Все поля обязательны к заполнению");
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="form__wrapper flex flex-col items-center justify-center"
    >
      <section className="form__wrapper-grid grid items-start justify-center">
        <InputUI
          label="Ваше Имя"
          placeholder="Например, Нурсултан"
          error={errors.name?.message}
          {...register("name", { required: true })}
        />

        <InputUI
          label="Ваша Фамилия"
          placeholder="Например, Конканов"
          error={errors.surname?.message}
          {...register("surname", { required: true })}
        />

        <Controller
          name="skills"
          control={control}
          rules={{
            validate: (v) => v.length > 0,
          }}
          render={({ field }) => (
            <InputSkillsUI value={field.value} onChange={field.onChange} />
          )}
        />

        <InputUI
          label="Ваш Email"
          placeholder="Например, konkanov@gmail.com"
          error={errors.email?.message}
          {...register("email", {
            required: true,
            pattern: {
              value: /^\S+@\S+$/,
              message: "Введите корректный email",
            },
          })}
        />
      </section>

      <section className="form__wrapper-submit flex flex-row items-center justify-end">
        <button type="submit" className="form__wrapper-submit_button Small">
          Сохранить
        </button>
      </section>
    </form>
  );
};
