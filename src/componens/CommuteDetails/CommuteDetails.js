import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useService } from '../../hooks/useService';
import { formatDate } from '../../utils/dateUtils';
import { commuteServiceFactory } from '../../services/commuteService';
import { commentServiceFactory } from '../../services/commentService';
import { useAuthContext } from '../../contexts/AuthContext';

import styles from './CommuteDetails.module.css';
import { AddComment } from './AddComment/AddComment';
import { commuteReducer } from '../../reducers/commuteReducer';

export const CommuteDetails = ({
    setDeletedCommute,
}) => {
    const { commuteId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const [commute, dispatch] = useReducer(commuteReducer, {});
    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            commuteService.getOne(commuteId),
            commentService.getAll(commuteId),
        ]).then(([commuteData, comments]) => {
            const commuteState = {
                ...commuteData,
                comments,
            }
            dispatch({type: 'COMMUTE_FETCH', commute: commuteState})
        });
    }, [commuteId, commentService, commuteService]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(commuteId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail
        });
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
                                <p>{comment.author.email}: {comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                    {!commute.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/commutes/${commute._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};