import { FC, memo } from "react";
import { formatToKilo } from "../../../utils/format.utils";
import { UserAvatar } from "../user-avatar/UserAvatar";
import { IShortInfo } from "./ShortInfo.interface";
import styles from "./ShortInfo.module.scss";

const ShortInfo: FC<IShortInfo> = memo(({ channel, message }) => {
  return (
    <div className={styles.info_wrapper}>
      <UserAvatar
        avatarPath={channel.avatarPath}
        isVerified={channel.isVerified}
        id={channel.id}
      />
      <div>
        <div className={styles.name}>{channel.name}</div>
        <div className={styles.subscribers_count}>
          {message ||
            formatToKilo(channel.subscrubersCount || 0) + " підписників"}
        </div>
      </div>
    </div>
  );
});

export default ShortInfo;
