import { FC, MouseEventHandler } from "react";
import { BsPersonPlusFill } from "react-icons/bs";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import styles from "./Subscribe.module.scss";
export const Subscribe: FC<{ channelIdToSub: number | undefined }> = ({
  channelIdToSub,
}) => {
  const { user } = useAuth();
  const { addMsg } = useActions();

  const { data: profile } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
  });
  const [subscribe, { isLoading, data: isDone }] = api.useSubscribeMutation();

  const isSubscribed =
    profile?.subscriptions.some((sub) => sub.toUser.id === channelIdToSub) ||
    isDone;

  if (profile?.id === channelIdToSub || !channelIdToSub) return null;

  const onSubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!user)
      return addMsg({ message: "Вам потрібно увійти у аккаунт", status: 500 });

    subscribe({ id: profile?.id!, channelToSub: channelIdToSub })
      .unwrap()
      .catch((e) => addMsg({ message: e.message, status: 500 }));
  };
  return (
    <button
      onClick={onSubscribe}
      className={`${styles.button} ${isSubscribed && styles.subscribed}`}
      disabled={isLoading}
    >
      <BsPersonPlusFill />
      {isSubscribed ? "Підписаний" : "Підписатися"}
    </button>
  );
};
