import { IUser } from "../../types/user.interface";
import { axiosRequest } from "../../api/axios";

export const USER_PATH = 'user';

export const UserService = {
    getAll: async function (){

        const response = await axiosRequest.get<IUser[]>(`/${USER_PATH}/all`)
        return response.data
        
    },

    getById: async function (id: number) {
        const response = await axiosRequest.get<IUser>(`/${USER_PATH}/by_id/${id}`);
        return response.data;
    }
}