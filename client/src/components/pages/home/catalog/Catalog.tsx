import { FC } from "react";
import { Heading } from "../../../ui/heading/Heading";
import { VideoLoader } from "../../../ui/skeleton/video-item/VideoLoader";
import { VideoItem } from "../../../ui/video-item/suspense/VideoSuspense";
import { ICatalog } from "./Catalog.interface";
import styles from "./Catalog.module.scss";

const Catalog: FC<ICatalog> = ({
  videosToRender,
  title,
  removeHandler,
  updateHandler,
  isLoading,
}) => {
  return (
    <div className={styles.videos_wrapper}>
      <Heading title={title} />
      <div className={styles.videos_block}>
        {isLoading && <VideoLoader amount={5} />}
        {videosToRender.length
          ? videosToRender.map((item) => {
              return (
                <VideoItem
                  item={item}
                  removeHandler={removeHandler}
                  updateHandler={updateHandler}
                  isSmall={false}
                  key={item.id}
                />
              );
            })
          : !isLoading && (
              <div className={styles.not_found}>Тут немає відео</div>
            )}
      </div>
    </div>
  );
};

export default Catalog;
