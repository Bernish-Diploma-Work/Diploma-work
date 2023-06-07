import { FC } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import { Logo } from "../../ui/logo/Logo";
import { Menu } from "../../ui/SuspenseWrapper";
import { MenuArr } from "./menu/menu.data";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  const { user } = useAuth();
  const { data } = api.useGetProfileQuery(user?.id!, {
    skip: !user,
  });

  const subsToRender = data?.subscriptions.slice(0, 10);

  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Menu title="Меню" items={MenuArr} />
      {user && !!subsToRender?.length && (
        <Menu
          title="Мої підписки"
          items={
            subsToRender.map((sub) => ({
              image: sub.toUser.avatarPath,
              link: `/channel/${sub.toUser.id}`,
              title: sub.toUser.name,
            })) || []
          }
        />
      )}
    </aside>
  );
};

export default Sidebar;
