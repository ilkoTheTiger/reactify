import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><Link to='/'><img src="https://drive.google.com/uc?id=1YtESxvOdQR4C4MLY7qGLq_wAHDFvU8Xd" alt="CleanIt Logo from Google Drive" /></Link></li>
                <li><Link to='/'><i className="fa fa-home" aria-hidden="true"></i></Link></li>
                <li><Link to='/commutes'>Commutes</Link></li>
                <li><Link to='/host'>Host</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        </nav>
    );
};