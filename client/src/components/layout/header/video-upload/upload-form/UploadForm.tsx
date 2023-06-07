import { FC } from "react";
import { Controller } from "react-hook-form";
import Field from "../../../../ui/fields/Fields";
import { UploadField } from "../../../../ui/fields/upload-field/UploadField";
import TextArea from "../../../../ui/text-area/TextArea";
import { useUploadForm } from "./useUploadForm";
import { IMediaResponse } from "../../../../../services/media/Media.interface";
import { UploadVideoInfo } from "./upload-video-info/UploadVideoInfo";
import { UploadFormFooter } from "./upload-footer/UploadFormFooter";
import { ToggleSwitch } from "../../../../ui/switcher/ToggleSwitch";
import styles from "./UploadForm.module.scss";
import { IUploadForm } from "./UploadForm.interface";
import { Button } from "../../../../ui/button/Button";

export const UploadForm: FC<IUploadForm> = ({
  handleCloseModal,
  videoId,
  isEdit,
  onCloseUnfinished,
}) => {
  const { form, media, status } = useUploadForm({ handleCloseModal, videoId });

  const choseFormButton = (
    <div className={styles.form_wrapper}>
      <div className={styles.fields_wrapper}>
        <p className={styles.panel_title}>{"Оберіть формат контенту"}</p>
      </div>

      <div className={styles.fields_wrapper}>
        <div className={styles.panel_buttons}>
          <Button onClick={() => form.handleVideoCase()}>Відео</Button>
          <Button onClick={() => form.handleStreamCase()}>Стрім</Button>
        </div>
      </div>
    </div>
  );

  const videoUploadField = (
    <Controller
      control={form.control}
      {...form.register("videoPath", {
        required: "",
      })}
      render={() => (
        <UploadField
          title={"Виберіть відео для завантаження"}
          setValue={status.setProgress}
          onChange={media.handleUploadVideo}
          onChooseFile={status.setIsChosen}
          type={"video"}
        />
      )}
    />
  );

  const videoContent = (
    <>
      <div className={styles.form_wrapper}>
        <div className={styles.fields_wrapper}>
          <Field
            {...form.register("name", {
              required: "Введіть назву",
            })}
            placeholder="Назва"
            error={form.errors.name}
          />

          <TextArea
            {...form.register("description", {
              required: "Добавте опис!",
            })}
            placeholder="Опис"
            error={form.errors.description}
          />
          <div className={styles.upload_field}>
            <Controller
              control={form.control}
              {...form.register("thumbnailPath", {
                required: "Оберіть спочатку прев'ю",
              })}
              render={({ field: { onChange } }) => (
                <UploadField
                  title="Оберіть Прев'ю"
                  onChange={(value: IMediaResponse) => onChange(value.url)}
                  type={"image"}
                />
              )}
            />
          </div>
        </div>
        <UploadVideoInfo
          error={form.errors.thumbnailPath}
          thumbnailPath={media.thumbnailPath}
        />
      </div>
      <div>
        <Controller
          control={form.control}
          name="isPublic"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <ToggleSwitch
              clickHandler={() => onChange(!value)}
              isEnabled={!!value}
            />
          )}
        />
      </div>

      <UploadFormFooter
        progress={status.percent}
        isUploaded={status.isUploaded}
        isEdit={!!isEdit}
        isProcessing={status.isProcessing}
        onCloseUnfinished={onCloseUnfinished}
      />
    </>
  );

  const streamContent = (
    <>
      <div className={styles.form_wrapper}>
        <div className={styles.fields_wrapper}>
          <Field
            {...form.register("name", {
              required: "Введіть назву",
            })}
            placeholder="Назва"
            error={form.errors.name}
          />

          <TextArea
            {...form.register("description", {
              required: "Добавте опис!",
            })}
            placeholder="Опис"
            error={form.errors.description}
          />
          <div className={styles.fields_wrapper}>
            <div className={styles.upload_field}>
              <Controller
                control={form.control}
                {...form.register("thumbnailPath", {
                  required: "Оберіть спочатку прев'ю",
                })}
                render={({ field: { onChange } }) => (
                  <UploadField
                    title="Оберіть Прев'ю"
                    onChange={(value: IMediaResponse) => onChange(value.url)}
                    type={"image"}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className={styles.fields_wrapper}>
          <UploadVideoInfo
            error={form.errors.thumbnailPath}
            thumbnailPath={media.thumbnailPath}
          />

          <Button
            onClick={() =>
              setTimeout(() => {
                window.location.reload();
              }, 1000)
            }
          >
            Почати стрім
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <form onSubmit={form.handleSubmit(form.onSubmit)}>
      {status.isFormatChosen
        ? status.isStream
          ? streamContent
          : status.isChosen || isEdit
          ? videoContent
          : videoUploadField
        : choseFormButton}
    </form>
  );
};
