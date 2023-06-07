import { FC, memo } from "react";
import { IVideoItem } from "./VideoItem.interface";
import { truncTitle } from "../../../utils/format.utils";
import { UserAvatar } from "../user-avatar/UserAvatar";
import styles from "./VideoItem.module.scss";
import { Link } from "react-router-dom";
import { mockups } from "../../../assets/mockups/images";
import {
  VideoDuration,
  VideoManipulations,
  VideoStats,
} from "./suspense/VideoSuspense";

const VideoItem: FC<IVideoItem> = memo(
  ({ removeHandler, item, isSmall, updateHandler }) => {
    return (
      <div className="relative">
        <div
          className={`${styles.small_wrapper} ${
            isSmall ? styles.search_results : ""
          }`}
        >
          <Link to={`/videos/${item.name || "default"}/${item.id}`}>
            <img
              src={item.thumbnailPath}
              alt={item.name}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = mockups.defaultThumbnail;
              }}
            />

            <VideoDuration duration={item.duration} position={"top-r"} />
            <div className={styles.small_content}>
              {!isSmall ? (
                <>
                  <span className={styles.span}>
                    {item.user?.name || "Без імені"}
                  </span>
                  <h3 title={item.name}>
                    {item.name ? truncTitle(item.name, 50) : "Без назви"}
                  </h3>
                </>
              ) : (
                <h3 title={item.name}>
                  {item.name ? truncTitle(item.name, 10) : "Без назви"}
                </h3>
              )}

              <VideoStats
                createdAt={item.createdAt}
                views={item.views}
                isSmall={isSmall}
              />
            </div>
            <div className={styles.small_avatar}>
              <UserAvatar
                avatarPath={item.user?.avatarPath}
                isVerified={item.user?.isVerified}
                id={item.user?.id}
              />
            </div>
          </Link>
          {!!removeHandler && (
            <VideoManipulations
              {...{ removeHandler, id: item.id, updateHandler }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default VideoItem;
