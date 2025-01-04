import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { singInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        singInWithGoogle()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='mx-4 mb-4'>
              <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='text-white btn bg-blue-700 w-full'>SignIn With Google</button>
        </div>
    );
};

export default SocialLogin;