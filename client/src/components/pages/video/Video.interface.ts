import { IVideo } from "../../../types/video.interface";


export interface IVideoPage {
    video: IVideo
}

export interface IVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void;
    mozRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;

}