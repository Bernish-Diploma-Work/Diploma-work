import { Dispatch, SetStateAction } from "react";

export interface IVideoModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    videoId: number;
}