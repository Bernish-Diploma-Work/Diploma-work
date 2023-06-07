import { FC } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../hooks/useActions";
import { useAuth } from "../../../../../hooks/useAuth";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { useIsMobile } from "../../../../../hooks/useMobile";
import { api } from "../../../../../store/api/api";
import { AvatarElement } from "../../../../ui/SuspenseWrapper";
import styles from "./ProfileMenu.module.scss";

const ProfileMenu: FC = () => {
  const { user } = useAuth();

  const { isLoading, data } = api.useGetProfileQuery(user!.id, {
    skip: !user,
  });
  const { logout } = useActions();
  const { ref, isShow, setIsShow } = useClickOutside(false);
  const { isMobile } = useIsMobile();

  if (isLoading) return null;

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsShow(!isShow);
        }}
      >
        <AvatarElement avatarPath={data?.avatarPath} />
        {!isMobile && <span>{data?.name || ""}</span>}
        {/* {isShow ? <IoChevronUp className={styles.icon} /> : <IoChevronDown className={styles.icon} />} */}
      </button>
      {isShow ? (
        <div className={styles.menu}>
          <ul>
            <li>
              <Link
                onClick={() => setIsShow(!isShow)}
                to={`/channel/${user?.id}`}
              >
                Мій канал
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsShow(!isShow)} to={`/studio`}>
                Студія
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsShow(!isShow)}
                to={`/user/profile-edit/${user?.id}`}
              >
                Редагувати профіль
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logout({});
                  setIsShow(!isShow);
                }}
              >
                Вихід
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileMenu;
