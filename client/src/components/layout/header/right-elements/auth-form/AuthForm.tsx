import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../hooks/useActions";
import { useAuth } from "../../../../../hooks/useAuth";
import { validEmail } from "../../../../../utils/generalUtils";
import { Button } from "../../../../ui/button/Button";
import Field from "../../../../ui/fields/Fields";
import { IAuthForm, IAuthFormComponent } from "./AuthForm.interface";
import styles from "./AuthForm.module.scss";

const AuthForm: FC<IAuthFormComponent> = ({ setIsShow }) => {
  const { isLoading } = useAuth();
  const { login } = useActions();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    login(data);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <Field
        {...register("email", {
          required: "Будь-ласка введіть ваш емейл",
          pattern: {
            value: validEmail,
            message: "Будь-ласка введіть валідний емейл",
          },
        })}
        placeholder={"Ваш емейл"}
        error={errors.email}
      />
      <Field
        {...register("password", {
          required: "Будь-ласка введіть ваш пароль",
          minLength: {
            value: 6,
            message: "Має бути хочаб 6 символів",
          },
        })}
        placeholder={"Ваш пароль"}
        error={errors.password}
      />
      <div className={"mt-5 mb-1 text-center"}>
        <Button type="submit">Ввійти</Button>
        <Link
          onClick={() => setIsShow(false)}
          to={"/registration"}
          className={styles.register}
        >
          Реєстрація
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
