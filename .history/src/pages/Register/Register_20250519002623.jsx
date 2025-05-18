import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signUpWithEmailAndPassword,
  updateUserProfile,
  loginWithGoogle,
} from "../../Firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie/register.json";
import Swal from "sweetalert2"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase) return "Password must have at least one uppercase letter.";
    if (!hasLowercase) return "Password must have at least one lowercase letter.";
    if (!isValidLength) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    setPasswordError("");
    setLoading(true);

    try {
      // Register the user
      const userCredential = await signUpWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update the user profile with name and photo URL
      await updateUserProfile(user, { displayName: name, photoURL });

      // Optionally, send user details to your backend
      const response = await fetch("http://localhost:5000/register-firebase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto login after successful registration
        await loginWithEmailAndPassword(email, password);

        // Show SweetAlert for success
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You are now logged in and ready to explore.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Go to Home",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/"); // Redirect to the homepage
          }
        });
      } else {
        throw new Error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="my-5 rounded-xl min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 overflow-hidden dark:bg-gray-700">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 dark:bg-gray-600 dark:text-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-gray-100">Register Now</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:text-black"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoURL" className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:text-black"
                placeholder="Enter photo URL (optional)"
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded pr-10 dark:text-black"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-9 cursor-pointer dark:text-black"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-100">Note: Must include uppercase, lowercase, and at least 6 characters.</p>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-gray-600 dark:text-gray-200">Already have an account? </span>
            <button
              onClick={() => navigate("/Login")}
              className="text-blue-600 hover:underline dark:text-gray-100"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Register with Google
            </button>
          </div>
        </div>
      </div>

      {/* Right: Lottie */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <Lottie animationData={loginAnimation} loop autoPlay className="w-full max-w-xl" />
      </div>
    </div>
  );
};

export default Register;
