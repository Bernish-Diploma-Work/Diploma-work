import { AxiosError } from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useActions } from "../../../../hooks/useActions";
import { VideoService } from "../../../../services/video/video.service";
import { IVideo } from "../../../../types/video.interface";
import { Catalog } from "../../../ui/SuspenseWrapper";

const NewVideos: FC = () => {
  const { addMsg } = useActions();

  const {
    data: videos,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useQuery<IVideo[], AxiosError>("Videos_query_all", VideoService.getAll);

  if (isError) addMsg({ message: error.message, status: 500 });

  return (
    <Catalog
      videosToRender={videos || []}
      title="Новинки"
      isLoading={isLoading}
    />
  );
};

export default NewVideos;
