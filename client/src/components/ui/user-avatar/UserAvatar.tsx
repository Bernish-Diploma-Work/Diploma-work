import { FC } from "react";
import { UserCheckMark } from "./UserCheckMark";
import styles from './UserAvatar.module.scss';
import { IUserAvatar } from "./UserAvatar.interface";
import { Link } from "react-router-dom";
import { AvatarElement } from "../SuspenseWrapper";

export const UserAvatar: FC<IUserAvatar> = ({ avatarPath, isVerified, id }) => {

    return (
        <Link to={`/channel/${id}`}>

            <div className={styles.avatar_wrapper}>
                <AvatarElement {...{ avatarPath }} />
                <div className={styles.avatar_check}>
                    {isVerified && <UserCheckMark />}
                </div>
            </div>
        </Link>
    )
}