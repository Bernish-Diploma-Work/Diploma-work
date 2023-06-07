import { FC } from "react";
import { useParams } from "react-router-dom";
import { setTabTitle } from "../../../../utils/generalUtils";
import { UploadForm } from "../../../layout/header/video-upload/upload-form/UploadForm";

import styles from './VideoEdit.module.scss';

const VideoEdit: FC = () => {
    setTabTitle("Edit Video")
    const { id } = useParams();

    return (
        <div className={styles.edit_wrapper}>

            <UploadForm
                videoId={Number(id)}
                handleCloseModal={() => { }}
                isEdit={true}
                onCloseUnfinished={() => { }}
            />
        </div>
    )
}

export default VideoEdit