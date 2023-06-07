import { ChangeEvent } from "react";
import { useMutation } from "react-query";
import { useActions } from "../../../../hooks/useActions";
import { MediaService } from "../../../../services/media/media.service";
import { IUploadField } from "./UploadField.interface";

interface IUseUpload extends IUploadField {}

export const useUpload = ({ onChange, onChooseFile, setValue }: IUseUpload) => {
  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => MediaService.upload(data, setValue),
    {
      onSuccess: ({ data }) => {
        onChange(data);
      },
      onError: (err: any) => {
        addMsg({
          message: `Виникла помилка при загрузці файлу. ${err.response?.data
            ?.message!}`,
          status: 500,
        });
        onChooseFile && onChooseFile(false);
      },
    }
  );

  const { addMsg } = useActions();

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    try {
      let videoDuration = 0;

      if (files[0].type.includes("video")) {
        const videoTag = await validateVideoFile(files[0]);
        videoDuration = videoTag.duration;
      }

      onChooseFile && onChooseFile(true);
      const formData = new FormData();
      videoDuration !== 0 &&
        window.sessionStorage.setItem(
          "videoDuration",
          (videoDuration * 1000).toFixed(0)
        );
      formData.append("media", files[0]);

      await mutateAsync(formData);
    } catch (error) {
      addMsg({ message: error, status: 500 });
    }
  };

  const validateVideoFile = (file: File): Promise<HTMLVideoElement> =>
    new Promise((resolve, reject) => {
      try {
        let video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          resolve(video);
        };

        video.onerror = function () {
          reject("Невірний формат відео. Будь-ласка виберіть відео файл.");
        };

        video.src = window.URL.createObjectURL(file);
      } catch (e) {
        reject(e);
      }
    });

  return { uploadFile };
};
