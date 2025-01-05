import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const MainLayout = () => {
    const [theme, setTheme] = useState('light'); // 'light' as default theme

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        document.body.className = theme === 'light' ? 'dark' : 'light'; // Apply theme globally
    };

    return (
        <div className={`bg-slate-50 ${theme}`}>
            <div className="w-11/12 mx-auto">
                <Navbar toggleTheme={toggleTheme} theme={theme} />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
