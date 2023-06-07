import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { setTabTitle } from "../../../utils/generalUtils";
import { Menu } from "../../ui/SuspenseWrapper";

const SubscriptionsPage: FC = () => {
  setTabTitle("Subscriptions");
  const { user } = useAuth();
  const { data: profile } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
  });

  return (
    <>
      {
        <Menu
          title="Мої підписки"
          items={
            profile?.subscriptions.map((sub) => ({
              image: sub.toUser.avatarPath,
              link: `/channel/${sub.toUser.id}`,
              title: sub.toUser.name,
            })) || []
          }
        />
      }
    </>
  );
};

export default SubscriptionsPage;
