import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { videoApi } from "../../../store/api/video.api";
import { setTabTitle } from "../../../utils/generalUtils";
import { Catalog } from "../../ui/SuspenseWrapper";

const Studio: FC = () => {
  setTabTitle("Studio");
  const { isLoading, user } = useAuth();

  const navigate = useNavigate();
  const { videos } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
    selectFromResult: ({ data }) => ({
      videos: data?.videos,
    }),
  });
  const [deleteVideo] = videoApi.useDeleteMutation();
  const { addMsg } = useActions();

  const handleDelete = (id: number) => {
    deleteVideo(id)
      .unwrap()
      .then(() => addMsg({ message: "Відео було видалено", status: 200 }));
  };

  const handleUpdate = (id: number) => {
    navigate(`/studio/edit/video/${id}`);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, isLoading]);

  return (
    <Catalog
      videosToRender={videos || []}
      title="Мої відео"
      removeHandler={handleDelete}
      updateHandler={handleUpdate}
      isLoading={isLoading}
    />
  );
};

export default Studio;
