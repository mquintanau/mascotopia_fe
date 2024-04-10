import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";
import ForgotPassword from "./pages/ForgotPassword";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <div className="h-screen w-screen bg-main text-black">
      <header>
        {/* Barra de navegación */}
        <NavbarExternal />
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:id/:token" element={<ResetPassword />} />
        </Routes>
      </main>
      <FooterRectangle />
    </div>
  );
}

export default App;
