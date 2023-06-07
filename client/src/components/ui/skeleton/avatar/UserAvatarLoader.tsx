import { FC } from "react";
import { Shimmer } from "../Shimmer";
import styles from './UserAvatarLoader.module.scss'

const UserAvatarLoader:FC = () => {

    return (
        <div className={styles.avatar}>
            <div>
                <Shimmer />
            </div>
        </div>
    )
}

export default UserAvatarLoader