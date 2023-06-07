import { FC, useEffect, useState } from "react";
import { HiCalendar } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { RiHeart2Fill } from "react-icons/ri";
import { useIsMobile } from "../../../../hooks/useMobile";
import { IVideo } from "../../../../types/video.interface";
import { formatToKilo } from "../../../../utils/format.utils";
import LikeVideoButton from "../../../ui/like-button/LikeVideoButton";
import { Subscribe } from "../../../ui/subscribe-button/Subscribe";
import { ShortInfo } from "../../../ui/SuspenseWrapper";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./VideoDetails.module.scss";
import dayjs from "dayjs";
import "dayjs/locale/uk";
dayjs.locale("uk");
dayjs.extend(relativeTime);

const VideoDetails: FC<IVideo> = (video) => {
  const { isMobile } = useIsMobile();

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        {isMobile ? <h2>{video.name}</h2> : null}
        {video.user && <ShortInfo channel={video.user} />}
        {!isMobile ? <h2>{video.name}</h2> : null}
        <p>{video.description}</p>
      </div>
      <div className={styles.stats}>
        <div className={styles.buttons}>
          {video.user && <Subscribe channelIdToSub={video.user.id} />}
        </div>
        <div className={styles.buttons}>
          <LikeVideoButton videoId={video.id} />
        </div>

        <div className={styles.video_perfomance}>
          <div>
            <IoEyeSharp />
            <span>{formatToKilo(video.views)} переглядів</span>
          </div>
          <div>
            <RiHeart2Fill />
            <span>{formatToKilo(video.likes)} вподобайок</span>
          </div>
          <div>
            <HiOutlineChatBubbleOvalLeftEllipsis />
            <span>{formatToKilo(video.commentsCount)} коментарів</span>
          </div>
          <div>
            <HiCalendar />
            <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
