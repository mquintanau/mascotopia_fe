// Pull back calendar
import { Route, Routes, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

import Signup from "./pages/Signup";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";

import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import NavbarInternal from "./components/NavbarInternal/NavbarInternal";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import DataContext from "./auth/DataContext";
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  // Se obtiene la ubicación actual de la aplicación para mostrar una navbar u otra
  const location = useLocation();
  console.log("Pathname", location.pathname);

  let showExternalNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/forgotPassword") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/resetPassword");

  return (
    <DataContext.Provider value={{ data, setData }}>
    <div className="h-screen w-screen bg-main text-black">
      <header>
        {showExternalNavbar && <NavbarExternal />}
        {!showExternalNavbar && <NavbarInternal />}
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            {" "}
            {/* Se protege la ruta de perfil y resetPassword */}
            <Route path="/forum" element={<Forum />} /> {/* Prueba foro */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />{" "}
            {/* Prueba perfil */}
            <Route
              path="resetPassword/:id/:token"
              element={<ResetPassword />}
            />{" "}
            {/* Se muestra el formulario de reseteo de contraseña */}
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/register" element={<Signup />} />
          </Route>
        </Routes>
      </main>
      <FooterRectangle />
    </div>
    </DataContext.Provider>
  );
}

export default App;
