import { AxiosProgressEvent } from "axios";
import { axiosRequest } from "../../api/axios"
import { IMediaResponse } from "./Media.interface"

export const MediaService = {

    upload: async function (media: FormData, setValue?: (val:number) => void) {
        return await axiosRequest.post<IMediaResponse>('/media/upload', media, {
            headers: {'Content-Type': 'multipart/form-data'},
            
            onUploadProgress: (event:AxiosProgressEvent) => {
                if (setValue) {
                    const progress = (event.loaded / event.total!) * 100;
                    setValue(Math.ceil(progress));
                }
            }
        })
    }
}