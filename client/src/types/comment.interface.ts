import { IBase } from "./base.interface"
import { IUser } from "./user.interface"
import { IVideo } from "./video.interface"

export interface IComment extends IBase {
    author: IUser
    body: string    
    video: IVideo
}

export interface ICommentDto extends Pick<IComment, 'body'> {
    videoId:number
}