import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { commentApi } from "../../../../store/api/comment.api";
import { ICommentDto } from "../../../../types/comment.interface";
import { MdSend } from "react-icons/md";
import Field from "../../../ui/fields/Fields";
import styles from "./Comments.module.scss";

export const CommentForm: FC<{ videoId: number }> = ({ videoId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICommentDto>({
    mode: "onChange",
  });

  const [createComment, { isLoading }] = commentApi.useCreateCommentMutation();

  const onSubmit: SubmitHandler<ICommentDto> = (data) => {
    createComment({ ...data, videoId })
      .unwrap()
      .then(() => reset());
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <Field
          {...register("body", {
            required: "Будь-ласка введіть хоч щось",
            maxLength: 200,
          })}
          placeholder="Напишіть свій коментар!"
          error={errors.body}
        />

        <button disabled={isLoading} className="text-xl text-purple mx-2">
          <MdSend />
        </button>
      </div>
    </form>
  );
};
