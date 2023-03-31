import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import styles from './Navigation.module.css';


export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/'><img src="https://drive.google.com/uc?id=1YtESxvOdQR4C4MLY7qGLq_wAHDFvU8Xd" alt="CleanIt Logo from Google Drive" /></NavLink></li>
                <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/'><i className="fa fa-home" aria-hidden="true"></i></NavLink></li>
                <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/commutes'>Commutes</NavLink></li>
                <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/login'>Login</NavLink></li>
                <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/register'>Register</NavLink></li>
                {isAuthenticated && (
                    <>
                        <li><NavLink style={({ isActive }) => ({ color: isActive ? '#13bc9c' : '' })} to='/host'>Host</NavLink></li>
                        <li><NavLink to='/logout'>Logout</NavLink></li>
                    </>
                )}
            </ul>
        </nav>
    );
};