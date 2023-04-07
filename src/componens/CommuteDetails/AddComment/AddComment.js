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

            <h3 htmlFor="comment">Add new comment:</h3>
            <form className={styles.commentForm} onSubmit={onSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.formInput}>
                        <textarea
                            name="comment"
                            className={styles.commentField}
                            placeholder="Type comment here.."
                            value={values.comment}
                            onChange={changeHandler}
                        ></textarea>
                    </div>

                </div>
                <input className={styles.inputButton} type="submit" value="Add Comment" />
            </form>
        </article >
    )
};