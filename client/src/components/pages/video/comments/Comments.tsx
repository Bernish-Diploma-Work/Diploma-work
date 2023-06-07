import { FC, memo, MouseEventHandler, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useAuth } from "../../../../hooks/useAuth";
import { useIsMobile } from "../../../../hooks/useMobile";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { IComments } from "./Comments.interface";
import styles from "./Comments.module.scss";

const Comments: FC<IComments> = memo(({ comments, videoId }) => {
  const [open, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { isMobile } = useIsMobile();

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!isMobile) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.comments_section}>
        <h2 onClick={handleClick}>
          Коментарі
          {isMobile && open ? <IoChevronUp /> : <IoChevronDown />}
        </h2>

        <div className={styles.line}></div>
        <div
          className={styles.comments_block}
          style={{
            height:
              open && isMobile ? "27rem" : !open && isMobile ? "5rem" : "",
          }}
        >
          {comments.length ? (
            <div>
              {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
              ))}
            </div>
          ) : (
            <p>Поки що немає коментарів</p>
          )}
        </div>
      </div>

      <div className={styles.bottomForm}>
        {user && <CommentForm videoId={videoId} />}
      </div>
    </div>
  );
});

export default Comments;
