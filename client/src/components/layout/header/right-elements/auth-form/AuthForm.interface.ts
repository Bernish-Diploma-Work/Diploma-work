import { Dispatch, SetStateAction } from "react";

export interface IAuthForm {
    email: string;
    password: string;
}

export interface IAuthFormComponent {
    setIsShow: Dispatch<SetStateAction<boolean>>
}