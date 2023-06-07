import { FC } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { AuthButton, ProfileMenu, VideoUpload } from "../../../ui/SuspenseWrapper";

import styles from './RightElements.module.scss';

const RightElements: FC = () => {

    const { user } = useAuth();


    return <div className={styles.elements}>
        {user
            ?
            <>
                <ProfileMenu />
                <VideoUpload />
            </>
            :
            <AuthButton />
        }
    </div>

}

export default RightElements