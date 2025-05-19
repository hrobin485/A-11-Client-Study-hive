import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import logo from "../../assets/logo/nav-logo.png";
import { HiMoon, HiSun } from 'react-icons/hi';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(false);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('successful sign out');
            })
            .catch(error => {
                console.log('failed to sign out. stay here. don\'t leave me alone');
            });
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `dark:text-gray-100 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Assignments"
                    className={({ isActive }) =>
                        `dark:text-gray-100 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`
                    }
                >
                    Assignments
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/PendingAssignments"
                    className={({ isActive }) =>
                        `dark:text-gray-100 ${isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`
                    }
                >
                    Pending Assignments
                </NavLink>
            </li>
        </>
    );



    return (
        <div className="navbar bg-slate-300 dark:bg-gray-800 text-black dark:text-gray-100 rounded-lg">
            <div className="navbar-start">
                {/* mobile hamburger + dropdown */}
                <div className="dropdown">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden p-2">
                        {/* icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>

                    {/* dropdown list — vertical with gaps on small devices */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-white dark:bg-gray-800 dark:text-gray-100 rounded-box space-y-2">
                        {links}
                    </ul>
                </div>

                {/* brand */}
                <Link className="flex items-center gap-2" to="/">
                    <img className="w-12 rounded-xl dark:bg-gray-100" src={logo} alt="Study Hive logo" />
                    <h3 className="text-2xl font-bold">Study Hive</h3>
                </Link>
            </div>

            {/* center links — hidden on mobile, horizontal on lg+ */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
            </div>

            <div className="navbar-end flex items-center gap-4">
                {user ? (
                    /* signed‑in menu */
                    <div className="relative group">
                        <img
                            src={user.photoURL || '/default-avatar.png'}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                        />
                        <div className="absolute left-0 w-48 bg-gray-700 text-white text-xs rounded px-2 py-1 mt-2 hidden group-hover:block space-y-1">
                            <NavLink to="/CreateAssignment" className="block px-2 py-1 hover:bg-gray-600 rounded">Create Assignments</NavLink>
                            <NavLink to="/MyAttemptedAssignments" className="block px-2 py-1 hover:bg-gray-600 rounded">My Attempted Assignments</NavLink>
                        </div>
                    </div>
                ) : (
                    /* auth buttons */
                    <div className="flex gap-2">
                        <Link to="/register" className="hover:text-blue-700">Register</Link>
                        <Link to="/signIn" className="hover:text-blue-700">Sign In</Link>
                    </div>
                )}

                {/* dark‑mode toggle */}
                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
                    {darkMode ? <HiSun className="text-yellow-500" size={24} /> : <HiMoon className="text-gray-500" size={24} />}
                </button>
            </div>
        </div>

};

export default Navbar;
