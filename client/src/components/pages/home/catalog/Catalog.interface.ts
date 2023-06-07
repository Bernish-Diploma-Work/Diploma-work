import { IVideo } from "../../../../types/video.interface";

export interface ICatalog {
    title: string;
    videosToRender: IVideo[] | [];
    isLoading: boolean;
    removeHandler?: (videoId: number) => void;
    updateHandler?: (videoId: number) => void;
}