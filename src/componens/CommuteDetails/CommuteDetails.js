import { useEffect, useReducer, useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';

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
    const [reservation, setReservation] = useState({
        reservationId: '',
    });
    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);
    const passengerService = useService(passengerServiceFactory);
    const navigate = useNavigate();
    document.title = `MetniMe - Details`
    

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
        }).catch((error) => [
            console.log(error.message)
        ]
        )
        // eslint-disable-next-line
    }, [commuteId]);

    useEffect(() => {
        Promise.all([
            passengerService.getAllPassengers(commuteId),
            passengerService.getUserReservation(commuteId, userId)
        ]).then(([reservations, userLiked]) => {
            setReservation(userLiked[0]?._id);
            if (reservations > commute.seats) {
                onLeaveClick();

                alert('Sorry, someone took the last seat!')

                navigate(`/commutes`)
            };
        });
    }, [reservation]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.create(commuteId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            // payload: {...response, email: userEmail}, // Possible substitute fir next 2 lines
            payload: response,
            userEmail
        });
    };

    const onCommentDelete = async (e) => {
        await commentService.deleteComment(e.target.dataset.id);
        if (userId === e.target.dataset.owner) {

            dispatch({
                type: 'COMMENT_DELETE',
                // payload: {...response, email: userEmail}, // Possible substitute fir next 2 lines
                payload: e.target.dataset.id,
                userEmail
            });
        }
    };

    const onReserveClick = async () => {
        const response = await passengerService.reserveSeat(commute._id);

        setReservation(response._id);

        dispatch({
            type: 'RESERVATION_ADD',
            payload: response,
            userEmail
        });
    };

    const onLeaveClick = async () => {
        const response = await passengerService.unreserveSeat(reservation);

        setReservation('');

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
            <div className={styles.detailsContainer}>
                <div className="info-section">

                    <div className={styles.commuteHeader}>
                        <h3>{commute.from}-{commute.to}</h3>
                        <span className="seats">Seats Left: {(commute.seats - commute.reservations > 0) ? (commute.seats - commute.reservations) : 'Commute is Full!'}</span>
                        {(reservation || isOwner) && (
                            <p className="phone">Phone: {commute.phone}</p>
                        )}
                        <p className="time">
                            {formatDate(commute.time)}
                        </p>
                    </div>



                    {commute.reservations < Number(commute.seats) && !isOwner && !reservation && isAuthenticated && (
                        <div className={styles.reservationActions}>
                            <input type='submit' className={styles.inputButton} onClick={onReserveClick} value={'Reserve a Seat'} />
                        </div>
                    )}

                    {!isOwner && reservation && isAuthenticated && (
                        <div className={styles.reservationActions}>
                            <input type='submit' className={styles.inputButton} onClick={onLeaveClick} value={'Leave the Commute'} />
                        </div>
                    )}

                    {isOwner && (
                        <>
                            <div className={styles.buttonContainer}>
                                <Link to={`/commutes/${commute._id}/edit`} className="button">
                                    <input type='submit' className={styles.inputButton} value="Edit" />
                                </Link>
                                <input type="submit" value="Delete" className={styles.inputButton} onClick={onDeleteClick} />
                            </div>
                        </>
                    )}

                    {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
                </div>
                <div className="details-comments">
                    <h3>Comments:</h3>
                    <ul type="none">
                        {commute.comments && Object.values(commute.comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p className={styles.commentLine}><strong>{comment.author.email}</strong>: {comment.comment} {userId === comment._ownerId && (<i data-owner={comment._ownerId} data-id={comment._id} onClick={onCommentDelete} class="fa-solid fa-trash"></i>)}</p>
                            </li>
                        ))}
                    </ul>
                    {!commute.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>
            </div>

        </section>
    );
};