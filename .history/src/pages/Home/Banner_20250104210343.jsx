import React from 'react';
import { easeOut, motion } from "framer-motion";
// import team1 from '../../assets/team/team1.jpg';
import team2 from '../../assets/team/team2.jpg';

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <motion.img
                        src="https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        animate={{ y: [50, 100, 50] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl" />
                    <motion.img
                        src={team2}
                        animate={{ x: [100, 150, 100] }}
                        transition={{ duration: 10, delay: 5, repeat: Infinity }}
                        className="max-w-sm w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl" />
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
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;