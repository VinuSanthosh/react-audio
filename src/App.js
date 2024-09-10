import React, { useContext } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';

function App() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={loggedIn ? <Home /> : <Login />} />
                <Route path="/" element={loggedIn ? <Home /> : <Login />} />
                <Route path="/home" element={loggedIn ? <Home /> : <Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;
