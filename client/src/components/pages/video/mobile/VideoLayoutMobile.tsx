import { FC } from "react";
import { Comments } from "../../../ui/SuspenseWrapper";
import { VideoDetails } from "../../../ui/video-item/suspense/VideoSuspense";
import styles from "../Video.module.scss";
import { IVideoInfoMobile } from "./VideoLayoutMobile.interface";
import VideoPlayer from "../video-player/video-player";
import { StreamAdminPanel } from "../stream-admin-panel/stream-admin-panel";

const VideoLayoutMobile: FC<IVideoInfoMobile> = ({ video, user }) => {
  return (
    <div className={styles.mobile_layout}>
      <div className={styles.video_container}>
        <VideoPlayer
          previewUrl={video.thumbnailPath}
          videoUrl={video.isActiveStream ? video.streamUrl! : video.videoPath}
          isIvsStream={video.isActiveStream}
        ></VideoPlayer>
      </div>
      <div className={styles.video_bottom}>
        {video.isActiveStream && video.user.id === user?.id ? (
          <StreamAdminPanel
            streamKey={video.streamKey!}
            streamIngest={video.streamIngest!}
            videoId={video.id}
          ></StreamAdminPanel>
        ) : (
          ""
        )}
        <VideoDetails {...video} />
        <Comments videoId={video.id} comments={video.comments || {}} />
      </div>
    </div>
  );
};

export default VideoLayoutMobile;
