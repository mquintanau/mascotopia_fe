import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile/Profile";

import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import NavbarInternal from "./components/NavbarInternal/NavbarInternal";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./ProtectedRoute";

function App() {
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
    <div className="h-screen w-screen bg-main text-black">
      <header>
        {showExternalNavbar && <NavbarExternal />}
        {!showExternalNavbar && <NavbarInternal />}
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<PrivateRoute/>}>  
            <Route path="/profile" element={<Profile /> } />
            <Route path="resetPassword/:id/:token" element={<ResetPassword />} />
          </Route>
        </Routes>
      </main>
      <FooterRectangle />
    </div>
  );
}

export default App;