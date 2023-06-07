import { FC, useState } from "react";
import { HiUpload } from "react-icons/hi";
import { useAuth } from "../../../../hooks/useAuth";
import { videoApi } from "../../../../store/api/video.api";
import { UploadModal } from "../../../ui/SuspenseWrapper";
import styles from './VideoUpload.module.scss';


const VideoUpload: FC = () => {
    const [videoId, setVideoId] = useState<number>();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth()
    const [createVideo] = videoApi.useCreateMutation();


    return (
        <>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    createVideo(user?.id!).unwrap().then((res) => {
                        setVideoId(res);
                        setIsOpen(true);
                    })
                }}

                title='Upload a video'
                className={styles.button}
            >
                <HiUpload />
            </button>
            {videoId && <UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} />}
        </>
    )
}

export default VideoUpload