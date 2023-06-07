import { AxiosError } from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useActions } from "../../../../hooks/useActions";
import { useIsMobile } from "../../../../hooks/useMobile";
import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { randomize } from "../../../../utils/generalUtils";
import { LargeVideo } from "../../../ui/video-item/suspense/VideoSuspense";
import styles from './Discover.module.scss';

const Discover: FC = () => {
    const { isMobile } = useIsMobile();
    const { addMsg } = useActions();
    const {
        error,
        data,
        isError
    } = useQuery<IVideo[], AxiosError>('Video_query', VideoService.getMostViewed)


    if (isError) {
        addMsg({ message: error.message, status: 500 })
        return null;
    };
    if (!data?.length) return null;

    const randomVideo = data.filter(video => video.id !== data[0].id)[randomize(0, data.length - 1)]
    return (

        <section className={styles.wrapper}>
            <div className={styles.video_wrapper}>
                <div className={styles.top_video}>
                    <LargeVideo {...data[0]} />
                </div>
                {(!isMobile && randomVideo) && <div className={styles.random_video}>
                    <LargeVideo {...randomVideo} />
                </div>}

            </div>
        </section>
    )
}

export default Discover