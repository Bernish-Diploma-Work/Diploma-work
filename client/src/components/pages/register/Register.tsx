import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { setTabTitle } from "../../../utils/generalUtils";
import RegisterForm from "../../ui/profile-form/ProfileForm";
import { IRegisterForm } from "./Register.interface";
import styles from "./Register.module.scss";

const RegisterPage: FC = () => {
  setTabTitle("Create Account");
  const { user } = useAuth();
  const { register: registerAction } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    // for redirecting on success (unwrap asyncThunk doesn't work for some reason)
    if (user) navigate("/");
  }, [user]);

  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm<IRegisterForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    console.log(data);
    registerAction(data);
  };

  return (
    <section className={styles.container}>
      <RegisterForm
        form={{
          handleSubmit: handleSubmit(onSubmit),
          setValue,
          control,
          register,
          errors,
        }}
        title={"Будь-ласка заповніть всі поля для реєстрації аккаунта"}
        buttonTitle="Створити аккаунт"
      />
    </section>
  );
};

export default RegisterPage;
