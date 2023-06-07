import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../../hooks/useMobile";
import { videoApi } from "../../../store/api/video.api";
import { IVideo } from "../../../types/video.interface";
import { setTabTitle } from "../../../utils/generalUtils";
import { Comments, VideoLayoutMobile } from "../../ui/SuspenseWrapper";
import { VideoDetails } from "../../ui/video-item/suspense/VideoSuspense";
import styles from "./Video.module.scss";
import VideoPlayer from "./video-player/video-player";
import { StreamAdminPanel } from "./stream-admin-panel/stream-admin-panel";
import { useAuth } from "../../../hooks/useAuth";

const Video: FC = () => {
  const { id } = useParams();
  const { isLaptopSmall } = useIsMobile();
  const { user } = useAuth();
  const { data: video = {} as IVideo } = videoApi.useGetByIdQuery(Number(id), {
    skip: !id,
  });

  const [incrementViews] = videoApi.useIncrementViewsMutation();

  setTabTitle(`${video.name || "Watch"}`);

  useEffect(() => {
    if (video.id) incrementViews(video.id);
    window.scrollTo(0, 0);
  }, [video.id]);

  return (
    <>
      {isLaptopSmall ? (
        <VideoLayoutMobile video={video} user={user} />
      ) : (
        <div className={styles.layout}>
          <div>
            <VideoPlayer
              previewUrl={video.thumbnailPath}
              videoUrl={
                video.isActiveStream ? video.streamUrl! : video.videoPath
              }
              isIvsStream={video.isActiveStream}
            ></VideoPlayer>
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
          </div>

          <Comments videoId={video.id} comments={video.comments || {}} />
        </div>
      )}
    </>
  );
};

export default Video;
