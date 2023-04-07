import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useService } from '../../hooks/useService';
import { formatDate } from '../../utils/dateUtils';
import { commuteServiceFactory } from '../../services/commuteService';
import { commentServiceFactory } from '../../services/commentService';
import { passengerServiceFactory } from '../../services/passengerService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useCommuteContext } from '../../contexts/CommuteContext';
import { commuteReducer } from '../../reducers/commuteReducer';

import styles from './CommuteDetails.module.css';
import { AddComment } from './AddComment/AddComment';

export const CommuteDetails = () => {
    const { commuteId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const { deleteCommute } = useCommuteContext();
    const [commute, dispatch] = useReducer(commuteReducer, {});
    const isOwner = commute._ownerId === userId;

    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);
    const passengerService = useService(passengerServiceFactory);
    const navigate = useNavigate();


    useEffect(() => {
        Promise.all([
            commuteService.getOne(commuteId),
            commentService.getAll(commuteId),
            passengerService.getAllPassengers(commuteId),
        ]).then(([commuteData, comments, reservations]) => {
            const commuteState = {
                ...commuteData,
                comments,
                reservations,
            }
            dispatch({ type: 'COMMUTE_FETCH', payload: commuteState })
        });
        // eslint-disable-next-line
    }, [commuteId]);

    useEffect(() => {
        Promise.all([

        ]).then(([]) => {

        });
    })

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(commuteId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            // payload: {...response, email: userEmail}, // Possible substitute fir next 2 lines
            payload: response,
            userEmail
        });
    };

    const onReserveClick = async () => {
        const response = await passengerService.reserveSeat(commute._id);

        dispatch({
            type: 'RESERVATION_ADD',
            payload: response,
            userEmail
        });
    };

    const onLeaveClick = async () => {
        const response = await passengerService.unreserveSeat(commute._id);

        dispatch({
            type: 'RESERVATION_DELETE',
            payload: response,
            userEmail
        });
    };

    const onDeleteClick = async () => {
        // eslint-disable-next-line
        const confirmation = confirm(`Commute ${commute.from}-${commute.to} is about to be deleted!`)

        if (confirmation) {
            await commuteService.delete(commute._id);

            deleteCommute(commute._id);

            navigate('/commutes');
        }
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


                <p>{commute.reservations}/{commute.seats}</p>
                {!isOwner && isAuthenticated && (
                    <div className="buttons">
                        <button className="button" onClick={onReserveClick}>Reserve a Seat</button>
                    </div>
                )}

                {!isOwner && isAuthenticated && (
                    <div className="buttons">
                        <button className="button" onClick={onLeaveClick}>Leave the Commute</button>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </section>
    );
};