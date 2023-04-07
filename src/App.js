import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { CommuteProvider } from './contexts/CommuteContext';

import { RouteGuard } from './componens/common/RouteGuard';
import { SessionGuard } from './componens/common/SessionGuard';
import { CommuteOwner } from './componens/common/CommuteOwner';

import './App.css';
import { Home } from './componens/Home/Home'
import { Navigation } from './componens/Navigation/Navigation';
import { Catalog } from './componens/Catalog/Catalog';
import { CommuteDetails } from './componens/CommuteDetails/CommuteDetails';
import { Host } from './componens/Host/Host';
import { Edit } from './componens/Edit/Edit';
import { Login } from './componens/Login/Login';
import { Register } from './componens/Register/Register';
import { Logout } from './componens/Logout/Logout';
import { Footer } from './componens/Footer/Footer';


function App() {

    return (
        <>
            <AuthProvider>
                <CommuteProvider>
                    <header>
                        <Navigation />
                    </header>
                    <main>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/commutes' element={<Catalog />} />
                            <Route path='/commutes/:commuteId' element={<CommuteDetails />}></Route>

                            <Route element={<RouteGuard />} >
                                <Route path='/host' element={<Host />} />
                                <Route path='/commutes/:commuteId/edit' element={
                                    <CommuteOwner>
                                        <Edit />
                                    </CommuteOwner>
                                } />
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
                </CommuteProvider>
            </AuthProvider>
        </>
    );
}

export default App;
