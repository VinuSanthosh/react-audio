import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                console.error('Error logging out', error);
                alert('Logout failed');
            }
        };

        logout();
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
