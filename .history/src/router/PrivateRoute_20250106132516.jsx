import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
const location = useLocation()

  useEffect(() => {
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); 
    });

    return () => unsubscribe(); 
  }, []);

  // If the authentication status is still being checked, show a loading spinner
  if (isAuthenticated === null) {
    return (
      <div className="loading-spinner">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is authenticated, show the requested route, else redirect to login
  if (isAuthenticated) {
    return element; 
  } else {
    return <Navigate state={location.pathname} to="/SignIn" replace />; 
  }
};

export default PrivateRoute;
