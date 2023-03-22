import styles from '../Catalog.module.css';
import { Link } from "react-router-dom";
import { formatDate } from '../../../utils/dateUtils';

export const CatalogItem = ({
    from,
    to,
    seats,
    phone,
    time,
    _id
}) => {
    return (
        <article className={styles.allCommutes}>
            <div className={styles.allCommutesInfo}>
                <p>Commute: {from}-{to}</p>
                <p>Available Seats: {seats}</p>
                <p>Phone: {phone}</p>
                <p>Scheduled for: {formatDate(time)}</p>
                <Link to={`/commutes/${_id}`} className={styles.detailsButton}><i className="fa-solid fa-up-right-from-square"></i></Link>
            </div>
        </article>
    );
};