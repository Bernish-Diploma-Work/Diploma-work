import { Dispatch, SetStateAction } from "react";

export interface IDialog {
    message: string;
    onDialog: () => void;
    isOpen:boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}