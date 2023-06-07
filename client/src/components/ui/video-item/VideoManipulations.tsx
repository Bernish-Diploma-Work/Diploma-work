import { FC } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { IManipulation } from "./VideoItem.interface";
import styles from './VideoItem.module.scss';


const VideoManipulations: FC<IManipulation> = ({ removeHandler, updateHandler, id }) => {


    return (
        <div className={styles.manipulations}>
            <button onClick={() => { !!removeHandler && removeHandler(id) }}>
                <HiTrash />
            </button>
            <button onClick={() => { !!updateHandler && updateHandler(id) }}>
                <HiPencil />
            </button>
        </div>

    )
}

export default VideoManipulations