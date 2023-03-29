import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as commuteService from '../../services/commuteService';

export const CommuteDetails = () => {
    const { commuteId } = useParams();
    const [commute, setCommute] = useState({});

    useEffect(() => {
        commuteService.getOne(commuteId)
            .then(result => {
                setCommute(result);
            })
    }, [commuteId]);

    return (
        <section id="commute-details">
            <h1>Commute Details</h1>
            <div className="info-section">

                <div className="commute-header">
                    <h1>{commute.from}-{commute.from}</h1>
                    <span className="seats">Seats: {commute.seats}</span>
                    <p className="phone">{commute.phone}</p>
                </div>

                <p className="time">
                    {commute.time}
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