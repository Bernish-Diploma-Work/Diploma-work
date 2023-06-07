import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../api/axios'
import { IProfileEditForm } from '../../components/pages/profile/ProfileEdit.interface'
import { USER_PATH } from '../../services/user/user.service'
import { IUser } from '../../types/user.interface'
import { TypeRootState } from '../store'


export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Profile', 'Video'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as TypeRootState).auth.user?.accessToken;

            if (token) headers.set('Authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        getProfile: builder.query<IUser, number>({
            query: (id) => `/${USER_PATH}/profile/${id}`,
            providesTags: () => [{ type: 'Profile' }]
        }),
        subscribe: builder.mutation<boolean, { id: number, channelToSub: number }>({
            query: ({ id, channelToSub }) => ({
                url: `${USER_PATH}/subscribe`,
                method: "PUT",
                body: {
                    userId: id,
                    channelToSub
                }
            }),
            invalidatesTags: () => [{ type: 'Profile' }]
        }),
        updateProfile: builder.mutation<IUser, {data:IProfileEditForm, id:number}>({
            query: (data) => ({
                url: `${USER_PATH}/profile_update/${data.id}`,
                method: "PUT",
                body: data.data
            }),
            invalidatesTags: () => [{type: 'Profile'}]

        })
    })
})


