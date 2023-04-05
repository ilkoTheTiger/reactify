import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useService } from '../../hooks/useService';

import { formatDate } from '../../utils/dateUtils';

import styles from './CommuteDetails.module.css';
import { commuteServiceFactory } from '../../services/commuteService';
import { commentServiceFactory } from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';

export const CommuteDetails = ({
    setDeletedCommute,
}) => {
    const { userId } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setCommnets] = useState([]);
    const { commuteId } = useParams();
    const [commute, setCommute] = useState({});
    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        commuteService.getOne(commuteId)
            .then(result => {
                setCommute(result);
                // return commentSevice.getAll(commuteId);
            })
        // .then(result => {
        //     setCommnets(result);
        // });
    }, [commuteId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await commentService.create(commuteId, {
            username,
            comment
        });

        setCommute(state => ({ ...state, comments: { ...state.comments, [result._id]: result } }));

        setUsername('');
        setComment('');
    };

    const isOwner = commute._ownerId === userId;

    const onDeleteClick = async () => {
        await commuteService.delete(commute._id);

        setDeletedCommute(commute);

        navigate('/commutes');
    };

    return (
        <section id={styles.commuteDetails}>
            <h2>Commute Details</h2>
            <div className="info-section">

            <div className="commute-header">
                    <h3>{commute.from}-{commute.to}</h3>
                    <span className="seats">Seats: {commute.seats}</span>
                    <p className="phone">Phone: {commute.phone}</p>
                </div>

                <p className="time">
                    {formatDate(commute.time)}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {commute.comments && Object.values(commute.comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p>{comment.username}: {comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                    {/* {!Object.values(commute.comments).length && (
                        <p className="no-comment">No comments.</p>
                    )} */}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/commutes/${commute._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current commute ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input type='text' name='username' placeholder='Username..' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};