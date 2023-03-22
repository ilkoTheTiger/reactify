import { useState, useEffect } from 'react';

import * as commuteService from './services/commuteService';

import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Host } from './componens/Host/Host';
import { Footer } from './componens/Footer/Footer';

import { Home } from './componens/Home/Home'
import { Navigation } from './componens/Navigation/Navigation';
import { Catalog } from './componens/Catalog/Catalog';



function App() {
    const navigate = useNavigate();
    const [commutes, setCommutes] = useState([]);

    const onHostCommuteSubmit = async (data) => {
        const createdCommute = await commuteService.create(data);
    
        setCommutes(state => [...state, createdCommute]);
    
        // navigate('/catalog');
    };

    return (
        <>
            <header>
                <Navigation />
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/host' element={<Host onHostCommuteSubmit={onHostCommuteSubmit} />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/login' element={<h1>Login Page</h1>} />
                    <Route path='/register' element={<h1>Register Page</h1>} />
                    <Route path='/*' element={<h1>404 Page</h1>} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
