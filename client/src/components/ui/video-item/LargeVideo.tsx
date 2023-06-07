import { FC } from "react"
import { Link } from "react-router-dom";
import { mockups } from "../../../assets/mockups/images";
import { IVideo } from "../../../types/video.interface"
import { truncTitle } from "../../../utils/format.utils";
import { UserAvatar } from "../user-avatar/UserAvatar";
import { VideoDuration, VideoStats } from "./suspense/VideoSuspense";
import styles from './VideoItem.module.scss';

const LargeVideo: FC<IVideo> = ({ views, duration, name, user, thumbnailPath, createdAt, id }) => {
    return (
        <div className={styles.large_wrapper}>
            <Link to={`/videos/${name}/${id}`}>
                <img
                    src={thumbnailPath}
                    className={styles.large_thumbnail}
                    alt={name}
                    onError={(e: any) => { e.target.onerror = null; e.target.src = mockups.defaultThumbnail }}
                />
                <div className={styles.large_content}>
                    <div className={styles.large_name}>
                        <h3 title={name}>{truncTitle(name, 150)}</h3>
                    </div>
                    <div className={styles.large_stats_wrapper}>
                        <UserAvatar
                            avatarPath={user?.avatarPath}
                            id={user?.id}
                            isVerified={user?.isVerified}
                        />
                        <div>
                            <span>{user?.name || 'Test'}</span>
                            <VideoStats
                                createdAt={createdAt}
                                views={views}
                                isSmall={false}
                            />
                        </div>
                    </div>

                </div>
            </Link>
            <VideoDuration duration={duration} />
        </div>
    )
}
export default LargeVideo