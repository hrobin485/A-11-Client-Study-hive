import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';

const SocialLogin = () => {
    const { singInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await singInWithGoogle();
            console.log(result.user);
            navigate('/'); // Redirect to homepage after successful login
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='mx-4 mb-4'>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='text-white btn bg-blue-700 w-full'>
                SignIn With Google
            </button>
        </div>
    );
};

export default SocialLogin;
