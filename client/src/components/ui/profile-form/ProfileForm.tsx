import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import { IMediaResponse } from "../../../services/media/Media.interface";
import { validEmail, validPassword } from "../../../utils/generalUtils";
import { Button } from "../button/Button";
import Field from "../fields/Fields";
import { UploadField } from "../fields/upload-field/UploadField";
import { AvatarElement } from "../SuspenseWrapper";
import TextArea from "../text-area/TextArea";
import { IProfileForm } from "./ProfileForm.interface";
import styles from "./ProfileForm.module.scss";

const ProfileForm: FC<IProfileForm> = ({
  form,
  title,
  fieldsToExclude,
  buttonTitle,
  defaultValues,
}) => {
  const [avatarPath, setAvatarPath] = useState("");

  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <form className={styles.form_box} onSubmit={form.handleSubmit}>
        {!fieldsToExclude?.email && (
          <div>
            <Field
              {...form.register("email", {
                required: "Будь-ласка введіть ваш емейл",
                pattern: {
                  value: validEmail,
                  message: "Будь-ласка введіть валідний емейл",
                },
              })}
              placeholder="Емейл"
              error={form.errors.email}
            />
          </div>
        )}

        {!fieldsToExclude?.username && (
          <div>
            <Field
              {...form.register("name", {
                required: "Будь-ласка введіть ваше ім'я",
              })}
              placeholder="ім'я"
              defaultValue={defaultValues?.name}
              error={form.errors.name}
            />
          </div>
        )}

        {!fieldsToExclude?.password && (
          <div>
            <Field
              {...form.register("password", {
                required: "Будь-ласка введіть ваш пароль",
                pattern: {
                  value: validPassword,
                  message:
                    "Пароль мусить містити хочаб один символ великою буквою, один символ маленькою, один символ число та бути хочаб 6 символів в довжину",
                },
              })}
              placeholder="Пароль"
              error={form.errors.password}
            />
          </div>
        )}
        {!fieldsToExclude?.description && (
          <div>
            <TextArea
              {...form.register("description", {})}
              placeholder="Опишіть ваш канал"
              maxLength={200}
              defaultValue={defaultValues?.description}
              error={form.errors.description}
            />
          </div>
        )}
        {!fieldsToExclude?.avatar && (
          <div className={styles.avatar_field}>
            <Controller
              control={form.control}
              name="avatarPath"
              defaultValue={defaultValues?.avatar}
              render={() => (
                <UploadField
                  onChange={(res: IMediaResponse) => {
                    form.setValue("avatarPath", res.url);
                    setAvatarPath(res.url);
                  }}
                  type="image"
                />
              )}
            />
            <div className={styles.avatar_preview}>
              <AvatarElement avatarPath={avatarPath || defaultValues?.avatar} />
            </div>
          </div>
        )}
        <div>
          <Button title="Підтвердіть форму">
            {buttonTitle || "Підтвердити"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
