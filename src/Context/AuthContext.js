import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const isLoggedIn = false;

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setLoggedIn(true);
    }, []);

    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
