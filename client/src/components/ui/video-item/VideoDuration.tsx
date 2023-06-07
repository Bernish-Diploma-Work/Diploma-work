import { FC } from "react"
import { millisToMinutesAndSeconds } from "../../../utils/format.utils";
import { IDuration } from "./VideoItem.interface";
import styles from './VideoItem.module.scss';


const VideoDuration: FC<IDuration> = ({duration, position = 'bot-r'}) => {

    if (!duration) return null;
    
    return (
        <div className={`${styles.duration} ${styles[position]}`}>
            <time>{millisToMinutesAndSeconds(duration)}</time>
        </div>
    )
}

export default VideoDuration