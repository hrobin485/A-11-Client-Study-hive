/* Banner.jsx */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";

import team2 from "../../assets/team/team2.jpg";
import AuthContext from "../../context/AuthContext/AuthContext";

const Banner = () => {
  /* ─────────────────────────── helpers ─────────────────────────── */
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /** SweetAlert that follows the current theme */
  const fireThemedAlert = (opts = {}) => {
    const isDark = document.documentElement.classList.contains("dark");
    Swal.fire({
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#f3f4f6" : "#374151",
      confirmButtonColor: isDark ? "#3b82f6" : "#2563eb",
      ...opts,
    });
  };

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

  /* ───────────────── animated images ───────────────── */
  const isLg = useMediaQuery({ minWidth: 1024 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const img1Y = isLg ? [40, 80, 40] : isMd ? [30, 60, 30] : [20, 40, 20];
  const img2X = isLg ? [45, 90, 45] : isMd ? [35, 70, 35] : [25, 50, 25];

  const controls1 = useAnimation();
  const controls2 = useAnimation();

  useEffect(() => {
    controls1.start({ y: img1Y });
    controls2.start({ x: img2X });
  }, [img1Y, img2X, controls1, controls2]);

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <div className="hero bg-base-200 dark:bg-gray-800 dark:text-gray-100 mt-5 rounded-xl">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse lg:ml-14">
        {/* images */}
        <div className="flex-1 -ml-9 lg:-ml-1">
          <motion.img
            src={team2}
            animate={controls1}
            transition={{ duration: 10, repeat: Infinity }}
            className="w-64 max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl"
          />

          <motion.img
            src="https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            animate={controls2}
            transition={{ duration: 10, delay: 5, repeat: Infinity }}
            className="w-64 max-w-sm rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl -ml-10 lg:ml-20"
          />
        </div>

        {/* text + button */}
        <div className="flex-1">
          <motion.h1
            animate={{ x: 50 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
            className="text-5xl font-bold"
          >
            Welcome&nbsp;
            <motion.span
              animate={{ color: ["#ecff33", "#33ffe3", "#ff6133"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              to
            </motion.span>{" "}
            Study&nbsp;Hive
          </motion.h1>

          <p className="py-6">
            Study Hive is a collaborative platform designed to enhance learning
            and teamwork among students and learners of all ages. The platform’s
            core focus is to enable collaboration, facilitate assignment
            completion, and foster personal and academic growth in a
            community‑driven environment.
          </p>

          <button onClick={handleGetStarted} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
