import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { authServiceFactory } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useState({});
    const authService = authServiceFactory(auth.accessToken);
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate('/commutes');
        } catch (error) {
            return alert(error.message);
        };
    };

    const onRegisterSubmit = async (values) => {
        const {confirmPassword , ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        };

        try {
            const result = await authService.register(registerData);

            setAuth(result);            

            navigate('/commutes');
        } catch (error) {
            return alert(error.message);
        };
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider>
                {children}
            </AuthContext.Provider>
        </>
    );
};
