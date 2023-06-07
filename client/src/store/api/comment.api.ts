import { COMMENT_PATH } from "../../services/comment/comment.service";
import { IComment, ICommentDto } from "../../types/comment.interface";
import { api } from "./api";


export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<IComment, ICommentDto>({
            query: (body) => ({
                url: `${COMMENT_PATH}/create`,
                method: "POST",
                body: body
            }),
            invalidatesTags: (result, error, {videoId}) => [{type: 'Video', id: videoId}]
        })
        
    })
})