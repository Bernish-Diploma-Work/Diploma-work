import { FC } from "react";
import VideoItemLoader from "./VideoItemLoader";




export const VideoLoader: FC<{amount:number}> = ({ amount }) => {

    const generateItems = () => {
        const items = Array(amount).fill(null);

        return items.map((item, ind) => (
            <VideoItemLoader key={ind} />
        ))
    }

    return (
        <>
            {generateItems()}
        </>
    )
}