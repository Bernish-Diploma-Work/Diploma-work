import { FC, MouseEventHandler, useMemo } from "react";
import { RiDislikeFill, RiHeart2Fill, RiStopCircleFill } from "react-icons/ri";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { videoApi } from "../../../store/api/video.api";
import { Button } from "../button/Button";
import styles from "./StopStreamBtn.module.scss";

const StopStreamBtn: FC<{ videoId: number }> = ({ videoId }) => {
  const { user } = useAuth();
  const { addMsg } = useActions();

  const { data: profile } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
  });

  const [stop, { isLoading }] = videoApi.useStopMutation();

  const onUpdateReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!user) return addMsg({ message: "Ви не залоговані", status: 500 });
    stop(videoId);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onUpdateReaction}
      className={styles.like_button}
    >
      {<RiStopCircleFill />}
      {"Зупинити стрім"}
    </Button>
  );
};

export default StopStreamBtn;
