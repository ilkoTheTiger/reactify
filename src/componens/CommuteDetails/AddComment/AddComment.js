import { useForm } from "../../../hooks/useForm";

import styles from './AddComment.module.css';

export const AddComment = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onCommentSubmit);

    return (
        <article className={styles.createComment}>
            <label htmlFor="comment">Add new comment:</label>
            <form className={styles.commentForm} onSubmit={onSubmit}>
                <textarea name="comment" placeholder="Type comment here.." value={values.comment} onChange={changeHandler}></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
            </form>
        </article>
    )
};