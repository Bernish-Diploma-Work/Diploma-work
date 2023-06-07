import { IComment } from "../../../../types/comment.interface";
import { FC } from 'react';
import styles from './Comments.module.scss';
import ShortInfo from "../../../ui/short-info/ShortInfo";


export const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {

    return (
        <div className={styles.commentItem}>
            <ShortInfo message={comment.body} channel={comment.author} />
        </div>
    )
} 