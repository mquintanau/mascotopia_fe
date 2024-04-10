import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./auth/AuthProvider";


const PrivateRoute = () => {
    const auth = useAuth();
   
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;