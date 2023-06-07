import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { setTabTitle } from "../../../utils/generalUtils";
import ProfileEditForm from "../../ui/profile-form/ProfileForm";
import { IProfileEditForm } from "./ProfileEdit.interface";
import styles from "./ProfileEdit.module.scss";

const ProfileEditPage: FC = () => {
  setTabTitle("Edit Profile");
  const { id } = useParams();
  const { user } = useAuth();
  const { data: profile } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
  });
  const navigate = useNavigate();

  const [updateProfile] = api.useUpdateProfileMutation();
  const { addMsg } = useActions();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<IProfileEditForm>();

  useEffect(() => {
    if (!user) return navigate("/");
    if (user.id !== Number(id)) return navigate("/");
  }, [id]);

  const onSubmit: SubmitHandler<IProfileEditForm> = (data) => {
    updateProfile({ data, id: Number(id) })
      .unwrap()
      .then(() =>
        addMsg({ message: "Profile successfully updated", status: 200 })
      );
  };

  return (
    <>
      {profile && (
        <section className={styles.container}>
          <ProfileEditForm
            form={{
              register,
              control,
              errors,
              handleSubmit: handleSubmit(onSubmit),
              setValue,
            }}
            title="Редагування профілю"
            buttonTitle="Зберегти"
            fieldsToExclude={{
              email: "email",
              password: "password",
            }}
            defaultValues={{
              name: profile.name,
              description: profile.description,
              avatar: profile.avatarPath,
            }}
          />
        </section>
      )}
    </>
  );
};

export default ProfileEditPage;
