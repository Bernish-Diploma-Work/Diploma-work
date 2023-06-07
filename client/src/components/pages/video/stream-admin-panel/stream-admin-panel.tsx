import { FC } from "react";

import styles from "./stream-admin-panel.module.scss";
import StopStreamBtn from "../../../ui/stop-stream-button/StopStreamBtn";

interface IStreamAdminData {
  streamKey: string;
  streamIngest: string;
  videoId: number;
}

export const StreamAdminPanel: FC<IStreamAdminData> = ({
  streamKey,
  streamIngest,
  videoId,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h2>Дані для власника потоку:</h2>
        <p>Сервер: rtmps://{streamIngest}</p>
        <p>Ключ Стріму: {streamKey}</p>

        <StopStreamBtn videoId={videoId}></StopStreamBtn>
      </div>
    </div>
  );
};
