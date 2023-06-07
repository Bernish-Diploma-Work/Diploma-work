import { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "../../../../../ui/button/Button";
import { IUploadFormFooter } from "./UploadFormFooter.interface";
import styles from "./UploadFormFooter.module.scss";

export const UploadFormFooter: FC<IUploadFormFooter> = ({
  progress,
  isUploaded,
  isEdit,
  onCloseUnfinished,
  isProcessing,
}) => {
  const handleOnClick = () => {
    if (!isEdit) {
      if (!isUploaded || isProcessing) return onCloseUnfinished();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={styles.wrapper}>
      {!isEdit && (
        <div className={styles.progress}>
          {isUploaded && !isProcessing ? <IoCheckmarkCircle /> : null}
          {!isUploaded ? `Відео завантажується ${progress}%` : ""}
          {isProcessing ? "Відео обробляється. Будь-ласка зачекайте..." : ""}
          {isUploaded && !isProcessing ? "Відео готове!" : ""}
        </div>
      )}
      <Button onClick={() => handleOnClick()}>Зберегти</Button>
    </div>
  );
};
