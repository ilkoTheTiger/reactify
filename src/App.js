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
import { RouteGuard } from './componens/common/RouteGuard';

function App() {

    return (
        <>
            <AuthProvider>
                <header>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/commutes' element={<Catalog commutes={commutes} />} />
                        <Route path='/commutes/:commuteId' element={<CommuteDetails setDeletedCommute={setDeletedCommute} />}></Route>

                        <Route element={<RouteGuard />} >
                            <Route path='/host' element={<Host onHostCommuteSubmit={onHostCommuteSubmit} />} />
                            <Route path='/commutes/:commuteId/edit' element={<Edit onEditCommuteSubmit={onEditCommuteSubmit} />} />
                            <Route path='/logout' element={<Logout />} />
                        </Route>

                        <Route element={<SessionGuard />} >
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </Route>

                        <Route path='/*' element={<h1>404 Page</h1>} />
                    </Routes>
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
