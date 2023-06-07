import { AxiosError } from "axios";
import { FC, useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { UserService } from "../../../services/user/user.service";
import { IUser } from "../../../types/user.interface";
import { setTabTitle } from "../../../utils/generalUtils";
import { Subscribe } from "../../ui/subscribe-button/Subscribe";
import { Catalog, ShortInfo } from "../../ui/SuspenseWrapper";
import styles from "./Channel.module.scss";

const Channel: FC = () => {
  const { id } = useParams();
  const { addMsg } = useActions();
  const { user: authUser } = useAuth();

  const {
    data: user,
    isError,
    isLoading,
    error,
  } = useQuery<IUser, AxiosError>([`Channel`, id], () =>
    UserService.getById(Number(id))
  );

  if (isError) addMsg({ message: error.message, status: 500 });

  setTabTitle(`${user?.name || "User"}`);

  const filterVideos = useMemo(() => {
    //filtering public videos to avoid showing hidden videos. If it's our own channel then return everything
    if (!user) return;

    return authUser?.id === user.id
      ? user.videos
      : user.videos!.filter((video) => video.isPublic == true);
  }, [user?.videos]);

  return (
    <>
      <div className={styles.channel_wrapper}>
        <div className={styles.channel_top}>
          {user ? <ShortInfo channel={user} /> : null}
          <Subscribe channelIdToSub={user?.id} />
        </div>
        <article className={styles.channel_description}>
          {user?.description}
        </article>
      </div>
      <Catalog
        videosToRender={filterVideos || []}
        title="Відео користувача"
        isLoading={isLoading}
      />
    </>
  );
};

export default Channel;
