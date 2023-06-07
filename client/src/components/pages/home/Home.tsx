import { FC } from "react";
import { setTabTitle } from "../../../utils/generalUtils";
import { Discover, NewVideos } from "../../ui/SuspenseWrapper";

const Home: FC = () => {
    setTabTitle("Broadcast Service")
    return (
        <>
            <Discover />
            <NewVideos />
        </>
    )


}


export default Home