import { useState, useEffect } from 'react';

import { AuthProvider } from './contexts/AuthContext';
import { commuteServiceFactory } from './services/commuteService';

import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Host } from './componens/Host/Host';
import { Footer } from './componens/Footer/Footer';

import { Home } from './componens/Home/Home'
import { Navigation } from './componens/Navigation/Navigation';
import { Catalog } from './componens/Catalog/Catalog';
import { CommuteDetails } from './componens/CommuteDetails/CommuteDetails';
import { Edit } from './componens/Edit/Edit';
import { Login } from './componens/Login/Login';
import { Register } from './componens/Register/Register';
import { Logout } from './componens/Logout/Logout';

function App() {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);
    const [deletedCommute, setDeletedCommute] = useState({});
    const commuteService = commuteServiceFactory(); // Pass accessToken

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

    const onEditCommuteSubmit = async (values) => {
        const result = await commuteService.edit(values._id, values);

        setCommutes(state => state.map(x => x._id === values._id ? result : x));

        navigate(`/commutes/${values._id}`);
    };

    return (
        <>
            <AuthProvider>
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/host' element={<Host onHostCommuteSubmit={onHostCommuteSubmit} />} />
                        <Route path='/commutes' element={<Catalog commutes={commutes} />} />
                        <Route path='/commutes/:commuteId' element={<CommuteDetails setDeletedCommute={setDeletedCommute} />}></Route>
                        <Route path='/commutes/:commuteId/edit' element={<Edit onEditCommuteSubmit={onEditCommuteSubmit} />}></Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/*' element={<h1>404 Page</h1>} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
