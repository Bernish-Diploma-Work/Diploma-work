
import { IoCheckmark } from 'react-icons/io5';
import styles from './UserAvatar.module.scss';

export const UserCheckMark = () => {

    return (
        <div className={styles.checkmark}>
            <IoCheckmark />
        </div>
    )
}