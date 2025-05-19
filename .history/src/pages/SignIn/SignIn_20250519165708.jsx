import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loginLottieJSON from '../../assets/lottie/login.json';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { singInUser, singInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook for navigation

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await singInUser(email, password);
            console.log('Sign in successful:', result.user);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
            });
            navigate('/'); // Redirect to homepage
        } catch (error) {
            console.error('Sign in error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Please check your credentials.',
            });
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen my-5 rounded-xl  dark:bg-gray-800 dark:text-gray-100">
            <div className="hero-content flex-col md:flex-row-reverse lg:flex-row-reverse ">
                <div className="text-center md:text-left lg:text-left w-64 lg:w-96">
                    <Lottie animationData={loginLottieJSON}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  dark:bg-gray-800 dark:text-gray-100">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered dark:text-black"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered dark:text-black"
                                required
                            />
                            <div className="flex justify-between mt-2">
                                <a href="#" className="text-sm link link-hover">
                                    Forgot Password?
                                </a>
                                <a href="/register" className="text-sm link link-hover">
                                    Register
                                </a>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="form-control">
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
