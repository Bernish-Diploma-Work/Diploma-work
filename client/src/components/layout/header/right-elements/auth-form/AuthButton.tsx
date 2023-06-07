import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthForm } from "../../../../ui/SuspenseWrapper";
import styles from './AuthForm.module.scss';

import { useClickOutside } from "../../../../../hooks/useClickOutside";
import styleElements from '../RightElements.module.scss';

const AuthButton: FC = () => {
    const { ref, isShow, setIsShow } = useClickOutside(false);

    return (
        <div className={styles.wrapper} ref={ref}>
            <button className={styleElements.button} onClick={() => setIsShow(!isShow)}>
                <FaUserCircle />
            </button>

            {isShow
                ?
                <AuthForm setIsShow={setIsShow} />
                : null
            }
        </div>
    )
}

export default AuthButton