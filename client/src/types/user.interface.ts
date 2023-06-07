import { IBase } from "./base.interface"
import { IVideo } from "./video.interface"

interface ISubscription {
    fromUser: IUser;
    toUser: IUser;
}

export interface IUser extends IBase {
    email: string
    name: string
    isVerified?: boolean
    subscrubersCount?: number
    description: string
    avatarPath: string
    subscribers: ISubscription[];
    subscriptions: ISubscription[];
    videos?: IVideo[]
    likedVideos: IVideo[]
}