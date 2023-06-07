
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "../../hooks/useMobile";
import { Header, InfoPop, Sidebar } from "../ui/SuspenseWrapper";
import styles from './Layout.module.scss';


const Layout: FC = () => {

    const { isMobile } = useIsMobile();
    return (
        <>
            <main className={styles.main}>
                <InfoPop />
                {!isMobile ? <Sidebar /> : null}

                <section className={styles.content}>
                    <Header />
                    <div className={styles.wrapper}>
                        <Suspense fallback={null}>
                            <Outlet />
                        </Suspense >
                    </div>
                </section>
            </main>
        </>
    )
}

export default Layout