import { FC } from "react";
import { IUploadField } from "./UploadField.interface";
import { useUpload } from "./useUpload";
import styles from "./UploadField.module.scss";

export const UploadField: FC<IUploadField> = ({ title, type, ...rest }) => {
  const { uploadFile } = useUpload({ type, ...rest });

  return (
    <div className={styles.file}>
      {title && <h2>{title}</h2>}
      <label>
        <span className="sr-only">Виберіть файл</span>
        <input type="file" onChange={uploadFile} accept={`${type}/*`} />
      </label>
    </div>
  );
};
