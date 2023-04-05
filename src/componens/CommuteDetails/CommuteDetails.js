import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useService } from '../../hooks/useService';

import { formatDate } from '../../utils/dateUtils';

import styles from './CommuteDetails.module.css';
import { commuteServiceFactory } from '../../services/commuteService';
import { commentServiceFactory } from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';

export const CommuteDetails = ({
    setDeletedCommute
}) => {
    const { userId } = useContext(AuthContext);
    const { commuteId } = useParams();
    const [commute, setCommute] = useState({});
    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);
    const navigate = useNavigate();

    useEffect(() => {
        commuteService.getOne(commuteId)
            .then(result => {
                setCommute(result);
            })
    }, [commuteId]);

    const isOwner = commute._ownerId === userId;

    const onDeleteClick = async () => {
        await commuteService.delete(commute._id);

        setDeletedCommute(commute);

        navigate('/commutes');
    };

    return (
        <section id={styles.commuteDetails}>
            <h1>Commute Details</h1>
            <div className="info-section">

                <div className="commute-header">
                    <h1>{commute.from}-{commute.to}</h1>
                    <span className="seats">Seats: {commute.seats}</span>
                    <p className="phone">Phone: {commute.phone}</p>
                </div>

                <p className="time">
                    {formatDate(commute.time)}
                </p>
                {isOwner && (
                    <div className="buttons">
                        <a href={`/commutes/${commute._id}/edit`} className="button">Edit</a>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>
        </section>
    );
};