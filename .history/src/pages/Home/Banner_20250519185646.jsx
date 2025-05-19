import { easeOut, motion } from "framer-motion";
import team2 from '../../assets/team/team2.jpg';
import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";


const Banner = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fireThemedAlert = (options = {}) => {
        const isDark = document.documentElement.classList.contains("dark");

        Swal.fire({
            background: isDark ? "#1f2937" : "#fff",   // gray‑800 vs white
            color: isDark ? "#f3f4f6" : "#374151", // gray‑100 vs gray‑700
            confirmButtonColor: isDark ? "#3b82f6" : "#2563eb", // blue‑500
            ...options,
        });
    };
    /* click handler for the Get Started button */
    const handleGetStarted = () => {
        if (user) {
            fireThemedAlert({
                title: "You're already signed in!",
                text: "Feel free to explore any page. Thank you for being with Study Hive.",
                icon: "info",
                confirmButtonText: "Got it",
            });
        } else {
            navigate("/signIn");
        }
    };

    return (

        <div className="hero bg-base-200 min-h-96 mt-5 rounded-xl dark:bg-gray-800  dark:text-gray-100">
            <div className="lg:ml-14 hero-content flex-col-reverse lg:flex-row-reverse">
                <div className='flex-1 -ml-9  lg:-ml-1'>
                    <motion.img
                        src={team2}
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl" />
                    <motion.img
                        src="https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        animate={{ x: [45, 80, 40] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl -ml-10 lg:ml-20" />
                </div>
                <div className='flex-1'>
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold">Welcome <motion.span
                            animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >to</motion.span> Study Hive</motion.h1>
                    <p className="py-6">
                        Study Hive is a collaborative platform designed to enhance learning and teamwork among students and learners of all ages. The platform's core focus is to enable collaboration, facilitate assignment completion, and foster personal and academic growth in a community-driven environment.
                    </p>
                    <button onClick={handleGetStarted} className="btn btn-primary">
                        Get Started
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Banner;