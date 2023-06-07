import { FC } from "react";
import { HiMenu } from "react-icons/hi";
import { Search } from "../search-bar/Search";
import styles from './MobileMenu.module.scss';
import styleElements from '../right-elements/RightElements.module.scss';
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { Sidebar } from "../../../ui/SuspenseWrapper";

const MobileMenu: FC = () => {
    const { ref, isShow, setIsShow } = useClickOutside(false);

    return (

        <div className={styles.wrapper} ref={ref}>
            <button className={styleElements.button} onClick={() => setIsShow(!isShow)}>
                <HiMenu />
            </button>
            {isShow &&
                <>
                    <div className={styles.sidebar} >
                        <Search />
                        <div onClick={() => setIsShow(false)}>
                            <Sidebar />
                        </div>
                    </div>
                    <div onClick={() => setIsShow(false)} className={styles.curtain}></div>
                </>
            }
        </div>

    )
}

export default MobileMenu