import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const MainLayout = () => {
    return (
        <div className={`bg-slate-50 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="w-11/12 mx-auto">
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
    );
};
${darkMode ? 'bg-gray-800' : 'bg-slate-300'}

export default MainLayout;