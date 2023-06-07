import { FormEventHandler } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IRegisterForm } from "../../pages/register/Register.interface";


export interface IProfileForm {
    form: {
        handleSubmit: FormEventHandler;
        register: UseFormRegister<any>;
        setValue: UseFormSetValue<any>;
        errors: FieldErrors<IRegisterForm>
        control: Control<any>;
    }
    title?: string;
    fieldsToExclude?: {
        name?: 'name'
        avatar?: 'avatar'
        description?: 'description'
        password?: 'password'
        email?: 'email'
        username?: 'username'
    }
    buttonTitle?: string;
    defaultValues?: {
        name?: string;
        avatar?: string;
        description?: string;
        username?: string;
    }
}