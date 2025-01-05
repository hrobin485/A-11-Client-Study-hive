import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// This component will protect routes that require authentication
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth status
const location = useLocation()

  useEffect(() => {
    const auth = getAuth(); // Firebase authentication instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // If there's a user, set it to true, else false
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  // If the authentication status is still being checked, show a loading spinner
  if (isAuthenticated === null) {
    return (
      <div className="loading-spinner">
        {/* You can use any loading spinner or animation of your choice */}
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is authenticated, show the requested route, else redirect to login
  if (isAuthenticated) {
    return element; 
  } else {
    return <Navigate state={location.pathname} to="/LogIn" replace />; 
  }
};

export default PrivateRoute;
