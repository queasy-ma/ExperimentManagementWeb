// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import AdminPanel from './AdminPanel';
import LoginForm from './LoginForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved === 'true';
    });

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    useEffect(() => {
        const saved = localStorage.getItem('isLoggedIn');
        if (saved === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="App">
            {isLoggedIn ? (
                <AdminPanel />
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
