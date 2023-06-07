import { FC, lazy, Suspense } from 'react';
import { IVideo } from '../../../../types/video.interface';
import { IDuration, IManipulation, IVideoItem, IVideoStats } from '../VideoItem.interface';

const VideoDetailsUI = lazy(() => import("../../../pages/video/video-details/VideoDetails"));
const VideoDurationUI = lazy(() => import("../VideoDuration"));
const VideoItemUI = lazy(() => import("../VideoItem"));
const VideoManipulationsUI = lazy(() => import("../VideoManipulations"));
const VideoStatsUI = lazy(() => import("../VideoStats"));
const LargeVideoUI = lazy(() => import("../LargeVideo"));


export const VideoDetails: FC<IVideo> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoDetailsUI {...{ ...props }} />
        </Suspense>
    )

}
export const VideoDuration: FC<IDuration> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoDurationUI {...{ ...props }} />
        </Suspense>
    )

}
export const VideoItem: FC<IVideoItem> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoItemUI {...{ ...props }} />
        </Suspense>
    )

}
export const LargeVideo: FC<IVideo> = (props) => {

    return (
        <Suspense fallback={null}>
            <LargeVideoUI {...{ ...props }} />
        </Suspense>
    )

}
export const VideoStats: FC<IVideoStats> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoStatsUI {...{ ...props }} />
        </Suspense>
    )

}
export const VideoManipulations: FC<IManipulation> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoManipulationsUI {...{ ...props }} />
        </Suspense>
    )

}