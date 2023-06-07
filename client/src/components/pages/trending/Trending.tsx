import { AxiosError } from "axios";
import { FC } from "react";
import { useQuery } from "react-query";
import { useActions } from "../../../hooks/useActions";
import { VideoService } from "../../../services/video/video.service";
import { IVideo } from "../../../types/video.interface";
import { setTabTitle } from "../../../utils/generalUtils";
import { Catalog } from "../../ui/SuspenseWrapper";

const Trending: FC = () => {
  setTabTitle("Popular");
  const { addMsg } = useActions();

  const {
    error,
    isLoading,
    isError,
    data: videos,
  } = useQuery<IVideo[], AxiosError>(
    "Videos_query",
    VideoService.getMostViewed
  );

  if (isError) addMsg({ message: error.message, status: 500 });

  return (
    <Catalog
      title="Популярне"
      videosToRender={videos || []}
      isLoading={isLoading}
    />
  );
};

export default Trending;
