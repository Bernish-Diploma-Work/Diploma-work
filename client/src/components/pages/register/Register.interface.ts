import { IAuthForm } from "../../layout/header/right-elements/auth-form/AuthForm.interface";


export interface IRegisterForm extends Pick<IAuthForm, 'email' | 'password'> {
    description: string;
    avatarPath: string;
    name: string;
}