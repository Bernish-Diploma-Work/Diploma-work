import { VIDEO_PATH } from "../../services/video/video.service";
import { IVideo, IVideoDto } from "../../types/video.interface";
import { api } from "./api";

export const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    stop: builder.mutation<IVideo, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/stop-stream/${id}`,
        method: "POST",
      }),
    }),
    update: builder.mutation<IVideo, IVideoDto>({
      query: (body) => ({
        url: `${VIDEO_PATH}/update/${body.id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Video", id },
        { type: "Profile" },
      ],
    }),
    create: builder.mutation<number, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/create`,
        method: "POST",
        body: {
          userId: id,
        },
      }),
      invalidatesTags: () => [{ type: "Video" }],
    }),
    incrementViews: builder.mutation<IVideo, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/increment_views/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Video", id }],
    }),
    updateReaction: builder.mutation<IVideo, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/update_reaction/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Video", id },
        { type: "Profile" },
      ],
    }),
    delete: builder.mutation<void, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Profile" }],
    }),
    getById: builder.query<IVideo, number>({
      query: (id) => ({
        url: `${VIDEO_PATH}/by_id/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),
    getBySearchTerm: builder.query<IVideo[], string>({
      query: (searchTerm) => ({
        url: `/${VIDEO_PATH}/all?searchTerm=${searchTerm}`,
      }),
      providesTags: (result, error, searchTerm) => [
        { type: "Video", searchTerm },
      ],
    }),
  }),
});
