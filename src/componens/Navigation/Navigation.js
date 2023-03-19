import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/bookings'>Bookings</Link></li>
                <li><Link to='/staff'>Service Providers</Link></li>
            </ul>
        </nav>
    );
};