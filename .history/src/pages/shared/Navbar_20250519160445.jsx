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
        <div className="navbar  bg-slate-300 dark:bg-gray-800 text-black dark:text-gray-100 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 dark:text-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="flex items-center gap-2">
                    <img className='w-12 dark:bg-gray-100 rounded-xl' src={logo} alt="" />
                    <h3 className="text-2xl font-bold">Study Hive</h3>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <div className="flex  items-center gap-4 relative group">
                            <div className="relative group">
                                <img
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                                />
                                <div className="absolute left-0 w-48 bg-gray-700 text-white text-xs rounded px-2 py-1 mt-2 hidden group-hover:block">
                                    <ul>
                                        <li><NavLink to="/CreateAssignment" className="block px-2 py-1 hover:bg-gray-600">Create Assignments</NavLink></li>
                                        <li><NavLink to="/MyAttemptedAssignments" className="block px-2 py-1 hover:bg-gray-600">My Attempted Assignments</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={handleSignOut} className="  dark:bg-gray-800 dark:text-gray-100">Sign out</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/register"><button className="hover:text-blue-700">Register</button></Link>
                            <Link to="/signIn">
                                <button className=" ml-2 
                    hover:text-blue-700">Sign In</button>
                            </Link>
                        </>
                    )
                }

                {/* Dark Mode Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 ml-4"
                >
                    {darkMode ? <HiSun className="text-yellow-500" size={24} />
                     : <HiMoon className="text-gray-500" size={24} />}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
