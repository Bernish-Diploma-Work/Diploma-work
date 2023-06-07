import { FC } from "react";
import UserAvatarLoader from "../avatar/UserAvatarLoader";
import { Shimmer } from "../Shimmer";
import styles from './VideoItemLoader.module.scss';

const VideoItemLoader: FC = () => {

    return (
        <div className="relative overflow-hidden shadow">
            <div className={`${styles.small_wrapper}`}>


                <div className={styles.img}>
                    <Shimmer />
                </div>

                <div className={styles.small_content}>
                    <span>
                        <Shimmer />

                    </span>
                    <h3>
                        <Shimmer />
                    </h3>
                </div>
                <div className={styles.small_avatar}>
                    <UserAvatarLoader />
                </div>


            </div>
        </div >
    )
}

export default VideoItemLoader