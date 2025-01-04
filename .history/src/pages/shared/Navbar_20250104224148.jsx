import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import logo from "../../assets/logo/nav-logo.png";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('successful sign out');
            })
            .catch(error => {
                console.log('failed to sign out. stay here. don\'t leave me alone');
            });
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Assignment">Assignment</NavLink></li>
            <li><NavLink to="/PendingAssignments">Pending Assignments</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-slate-300 rounded-lg">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="flex items-center gap-2">
                    <img className='w-12' src={logo} alt="" />
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
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <img
                                    src={user.photoURL || '/default-avatar.png'}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border border-gray-300"
                                />
                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded mt-16">
                                    {user.displayName || 'User Name'}
                                </div>
                            </div>
                            <button onClick={handleSignOut} className="btn">Sign out</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/signIn">
                                <button className="btn">Sign In</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
