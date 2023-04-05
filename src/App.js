import { useState, useEffect } from 'react';

import { AuthContext } from './contexts/AuthContext';
import { commuteServiceFactory } from './services/commuteService';
import { authServiceFactory } from './services/authService';

import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Host } from './componens/Host/Host';
import { Footer } from './componens/Footer/Footer';

import { Home } from './componens/Home/Home'
import { Navigation } from './componens/Navigation/Navigation';
import { Catalog } from './componens/Catalog/Catalog';
import { CommuteDetails } from './componens/CommuteDetails/CommuteDetails';
import { Login } from  './componens/Login/Login';
import { Register } from './componens/Register/Register';
import { Logout } from './componens/Logout/Logout';

function App() {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);
    const [auth, setAuth] = useState({});
    const [deletedCommute, setDeletedCommute] = useState({});
    const commuteService = commuteServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken);

    useEffect(() => {
        commuteService.getAll()
            .then(result => {
                setCommutes(result);
            });
    }, [deletedCommute]);

    const onHostCommuteSubmit = async (data) => {
        const createdCommute = await commuteService.create(data);
        setCommutes(state => [...state, createdCommute]);

        navigate('/commutes');
    };

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
            <AuthContext.Provider value={context}>
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/host' element={<Host onHostCommuteSubmit={onHostCommuteSubmit} />} />
                        <Route path='/commutes' element={<Catalog commutes={commutes} />} />
                        <Route path='/commutes/:commuteId' element={<CommuteDetails setDeletedCommute={setDeletedCommute} />}></Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/*' element={<h1>404 Page</h1>} />
                    </Routes>
                </main>
                <Footer />
            </AuthContext.Provider>
        </>
    );
}

export default App;
