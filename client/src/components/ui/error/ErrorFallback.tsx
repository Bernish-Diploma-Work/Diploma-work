import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import styles from "./ErrorFallback.module.scss";

export const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h2>
            Сталася помилка у роботі сайту, пробуйте перезавантажити сторінку!
          </h2>
        </div>
      </div>
    </div>
  );
};
