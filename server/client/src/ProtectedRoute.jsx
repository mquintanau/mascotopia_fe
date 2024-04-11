import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProtectedRoute = () => {

    const token = localStorage.getItem('token');// Obtiene el token de autenticación del local storage
    const tokenRestPassword = localStorage.getItem('tokenReset');// Obtiene el token de autenticación del local storage
    const location = useLocation(); // Obtiene la ubicación actual de la aplicación
    // Verifica si la ubicación actual es /perfil

    const isLogin = location.pathname === "/login"; // Verifica si la ubicación actual es /login
    const isProfile = location.pathname.startsWith("/profile"); // Verifica si la ubicación actual es /resetPassword    
    const isResetPassword = location.pathname.startsWith("/resetPassword"); // Verifica si la ubicación actual es /resetPassword    
    const isForgotPassword = location.pathname === "/forgotPassword"; // Verifica si la ubicación actual es /forgotPassword
    const isRegister = location.pathname === "/register"; // Verifica si la ubicación actual es /register
    // Si el token existe, retorna el componente Outlet
    // Si no, redirige al usuario a la página de login

    if(isProfile){
        let { id } = useParams();
        localStorage.setItem('idUser', id);
    }
    
    if ((isLogin||isForgotPassword||isRegister)){
        let idUser = localStorage.getItem('idUser');
        return token ? <Navigate to={`/profile/${idUser}`} /> : <Outlet />;//Si la ubicación actual es /login y el token existe, redirige al usuario a la página de perfil
    }
    
    if(isResetPassword){
        return tokenRestPassword ? <Outlet /> : <Navigate to="/login" />;//Si la ubicación actual es /resetPassword y el token de reseteo de contraseña existe, redirige al usuario a la página de login
    }
    return token ? <Outlet /> : <Navigate to="/login?noPermission=true" />; //Si el token no existe, redirige al usuario a la página de login

   
     //Si el token existe, retorna el componente Outlet
}

export default ProtectedRoute;