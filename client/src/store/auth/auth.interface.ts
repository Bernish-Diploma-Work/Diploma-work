import { IAuthData } from "../../services/auth/auth.interface";


export interface IAuthInitialState extends IAuthData {
    isLoading: boolean
}