import { FieldError } from "react-hook-form";
import { IVideo } from "../../../../../../types/video.interface";


export interface IUploadVideoInfo extends Pick<IVideo, 'thumbnailPath'> {
    error: FieldError | undefined
}