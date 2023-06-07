import { FC, memo } from "react";
import { useIsMobile } from "../../../hooks/useMobile";
import { MobileMenu, RightElements } from "../../ui/SuspenseWrapper";
import styles from './Header.module.scss';
import { Search } from "./search-bar/Search";

const Header: FC = memo(() => {
    const { isMobile } = useIsMobile();
    return <header className={`${styles.header}`}>
        {isMobile && <MobileMenu />}
        {!isMobile && <Search />}
        <RightElements />
    </header>
})

export default Header