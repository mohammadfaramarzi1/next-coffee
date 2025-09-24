import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({ productID, comments }) => {
  return (
    <div>
      <p>نظرات ({comments.filter((item) => item.isAccept).length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {comments.filter((item) => item.isAccept).length} دیدگاه برای کپسول
            قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی
          </p>
          <div>
            {comments.map(
              (item) => item.isAccept && <Comment key={item._id} {...item} />
            )}
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm productID={productID} />
        </div>
      </main>
    </div>
  );
};

export default Comments;
