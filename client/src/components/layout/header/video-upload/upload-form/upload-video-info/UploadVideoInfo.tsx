import { FC } from "react";
import { mockups } from "../../../../../../assets/mockups/images";
import { IUploadVideoInfo } from "./UploadVideoInfo.interface";
import styles from './UploadVideoInfo.module.scss';

export const UploadVideoInfo: FC<IUploadVideoInfo> = ({ thumbnailPath, error }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.img_container}>
                <img
                    src={thumbnailPath || mockups.defaultThumbnail}
                    alt='Video thumbnail'
                    onError={(e:any) => {e.target.onerror=null;e.target.src=mockups.defaultThumbnail}}
                />
            </div>
            <div className={styles.error}>
                {error ? error.message : ''}
            </div>
        </div>
    )
}