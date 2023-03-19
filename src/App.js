import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer } from './componens/Footer/Footer';

import { Home } from './componens/Home/Home'
import { Navigation } from './componens/Navigation/Navigation';

function App() {

    return (
        <>
            <header>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<h1>About Page</h1>} />
                    <Route path='/*' element={<h1>404 Page</h1>} />
                </Routes>
            </header>
            <main>
                <h1>Hello SoftUni</h1>
            </main>
            <Footer />
        </>
    );
}

export default App;
