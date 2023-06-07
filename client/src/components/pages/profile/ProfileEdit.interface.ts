import { IRegisterForm } from "../register/Register.interface";

export interface IProfileEditForm extends Pick<IRegisterForm, 'description' | 'avatarPath' | 'name'> {}