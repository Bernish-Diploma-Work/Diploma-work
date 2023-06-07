import { FC, lazy, Suspense } from "react";
import { IAuthFormComponent } from "../layout/header/right-elements/auth-form/AuthForm.interface";
import { IVideoModal } from "../layout/header/video-upload/VideoUpload.interface";
import { IMenu } from "../layout/sidebar/menu/Menu.interface";
import { ICatalog } from "../pages/home/catalog/Catalog.interface";
import { IComments } from "../pages/video/comments/Comments.interface";
import { IVideoInfoMobile } from "../pages/video/mobile/VideoLayoutMobile.interface";
import { IShortInfo } from "./short-info/ShortInfo.interface";

const MenuUI = lazy(() => import("../layout/sidebar/menu/Menu"));
const RightElementsUI = lazy(() => import("../layout/header/right-elements/RightElements"));
const HeaderUI = lazy(() => import("../layout/header/Header"));
const InfoPopUI = lazy(() => import("./info-pop/InfoPop"));
const VideoUploadUI = lazy(() => import("../layout/header/video-upload/VideoUpload"));
const ProfileMenuUI = lazy(() => import("../layout/header/right-elements/profile-menu/ProfileMenu"));
const AuthFormUI = lazy(() => import("../layout/header/right-elements/auth-form/AuthForm"));
const UploadModalUI = lazy(() => import("../layout/header/video-upload/UploadModal"));
const MobileMenuUI = lazy(() => import("../layout/header/left-elements-mobile/MobileMenu"));
const AuthButtonUI = lazy(() => import("../layout/header/right-elements/auth-form/AuthButton"));
const SidebarUI = lazy(() => import("../layout/sidebar/Sidbar"));
const CommentsUI = lazy(() => import("../pages/video/comments/Comments"));
const AvatarElementUI = lazy(() => import("./user-avatar/AvatarElement"));
const ShortInfoUI = lazy(() => import("./short-info/ShortInfo"));
const DiscoverUI = lazy(() => import("../pages/home/discover/Discover"));
const CatalogUI = lazy(() => import("../pages/home/catalog/Catalog"));
const NewVideosUI = lazy(() => import("../pages/home/new-videos/NewVideos"));
const VideoLayoutMobileUI = lazy(() => import("../pages/video/mobile/VideoLayoutMobile"));

export const VideoLayoutMobile: FC<IVideoInfoMobile> = (props) => {

    return (
        <Suspense fallback={null}>
            <VideoLayoutMobileUI {...{ ...props }} />
        </Suspense>
    )

}

export const Menu: FC<IMenu> = (props) => {

    return (
        <Suspense fallback={null}>
            <MenuUI {...{ ...props }} />
        </Suspense>
    )

}
export const NewVideos: FC = () => {

    return (
        <Suspense fallback={null}>
            <NewVideosUI />
        </Suspense>
    )

}
export const Catalog: FC<ICatalog> = (props) => {

    return (
        <Suspense fallback={null}>
            <CatalogUI {...{ ...props }} />
        </Suspense>
    )

}
export const Discover: FC = () => {

    return (
        <Suspense fallback={null}>
            <DiscoverUI />
        </Suspense>
    )

}

export const AvatarElement: FC<{ avatarPath?: string }> = (props) => {
    return (
        <Suspense>
            <AvatarElementUI {...{ ...props }} />
        </Suspense>
    )
}
export const ShortInfo: FC<IShortInfo> = (props) => {
    return (
        <Suspense>
            <ShortInfoUI {...{ ...props }} />
        </Suspense>
    )
}



export const Sidebar: FC = () => {

    return (
        <Suspense fallback={null}>
            <SidebarUI />
        </Suspense>
    )

}
export const Comments: FC<IComments> = (props) => {

    return (
        <Suspense fallback={null}>
            <CommentsUI {...{ ...props }} />
        </Suspense>
    )

}

export const RightElements: FC = () => {

    return (
        <Suspense fallback={null}>
            <RightElementsUI />
        </Suspense>
    )
}
export const Header: FC = () => {

    return (
        <Suspense fallback={null}>
            <HeaderUI />
        </Suspense>
    )
}
export const InfoPop: FC = () => {

    return (
        <Suspense fallback={null}>
            <InfoPopUI />
        </Suspense>
    )
}
export const UploadModal: FC<IVideoModal> = (props) => {

    return (
        <Suspense fallback={null}>
            <UploadModalUI {...{ ...props }} />
        </Suspense>
    )
}
export const VideoUpload: FC = () => {

    return (
        <Suspense fallback={null}>
            <VideoUploadUI />
        </Suspense>
    )
}
export const ProfileMenu: FC = () => {

    return (
        <Suspense fallback={null}>
            <ProfileMenuUI />
        </Suspense>
    )
}
export const AuthForm: FC<IAuthFormComponent> = (props) => {

    return (
        <Suspense fallback={null}>
            <AuthFormUI {...{ ...props }} />
        </Suspense>
    )
}
export const MobileMenu: FC = () => {

    return (
        <Suspense fallback={null}>
            <MobileMenuUI />
        </Suspense>
    )
}
export const AuthButton: FC = () => {

    return (
        <Suspense fallback={null}>
            <AuthButtonUI />
        </Suspense>
    )
}