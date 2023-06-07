import { IVideo } from "../../../../types/video.interface";
import { IAuthData } from "../../../../services/auth/auth.interface";

export interface IVideoInfoMobile extends IAuthData {
  video: IVideo;
}
