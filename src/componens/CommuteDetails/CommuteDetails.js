import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';

import { formatDate } from '../../utils/dateUtils';

import styles from './CommuteDetails.module.css';
import { commuteServiceFactory } from '../../services/commuteService';
import { commentServiceFactory } from '../../services/commentService';

export const CommuteDetails = () => {
    const { commuteId } = useParams();
    const [commute, setCommute] = useState({});
    const commuteService = useService(commuteServiceFactory);
    const commentService = useService(commentServiceFactory);

    useEffect(() => {
        commuteService.getOne(commuteId)
            .then(result => {
                setCommute(result);
            })
    }, [commuteId]);

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
                {/* <!-- Edit/Delete buttons ( Only for creator of this Commute )  --> */}
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>
        </section>
    );
};