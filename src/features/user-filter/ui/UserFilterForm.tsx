import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { InputUI } from "@/shared/ui/InputUI/InputUI";
import { useToaster } from "@/widgets/Toaster/ToasterProvider";
import { UserFilterFormValues } from "../model/menu";
import "./index.scss";

export const UserFilterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const toaster = useToaster();
  const [, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<UserFilterFormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = ({ email }: UserFilterFormValues) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", "1");

      if (email.trim()) {
        params.set("email", email.trim());
      } else {
        params.delete("email");
      }

      return params;
    });

    toaster.show("Фильтр успешно применён!", "success");
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form__wrapper flex flex-col items-center justify-center"
    >
      <section className="form__wrapper-grid flex items-center justify-center">
        <InputUI
          label="Введите Email Пользователя"
          placeholder="Например, konkanov@gmail.com"
          {...register("email")}
        />
      </section>

      <section className="form__wrapper-submit flex flex-row items-center justify-end">
        <button type="submit" className="form__wrapper-submit_button Small">
          Применить
        </button>
      </section>
    </form>
  );
};
