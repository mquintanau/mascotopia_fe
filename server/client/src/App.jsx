import { useState } from "react";

// Funciones de la lógica de la app
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

// Componentes de la app
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import NavbarInternal from "./components/NavbarInternal/NavbarInternal";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";

// Pagínas de la app
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DataContext from "./auth/DataContext";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import QuestionView from "./pages/QuestionView";
import Calendar from "./pages/Calendar";
import Modal from "react-modal";
import Feed from "./pages/Feed";
import LostPets from "./pages/LostPets";

Modal.setAppElement("#root");

function App() {
  const [data, setData] = useState(null);
  // Se obtiene la ubicación actual de la aplicación para mostrar una navbar u otra
  const location = useLocation();

  let showExternalNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/forgotPassword") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/resetPassword");

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="h-screen w-screen bg-main text-black">
        {/* Se ejecuta el componente para hacer scroll al inicio de la página */}
        <ScrollToTop />{" "}
        <header>
          {showExternalNavbar && <NavbarExternal />}
          {!showExternalNavbar && <NavbarInternal />}
        </header>
        <main className="mt-[50px]">
          {/* Contenido principal, manejando la navegacion con react-router-dom */}
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<LandingPage />} />
              {/* Se protege la ruta de perfil y resetPassword */}
              <Route path="/forum" element={<Forum />} /> {/* Prueba foro */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                path="/questionView/:idQuestion/:idForum"
                element={<QuestionView />}
              />
              {/* Prueba perfil */}
              <Route
                path="resetPassword/:id/:token"
                element={<ResetPassword />}
              />
              {/* Se muestra el formulario de reseteo de contraseña */}
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/register" element={<Signup />} />
              {/* Se muestra el calendario */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/lostPets" element={<LostPets />} />
            </Route>
          </Routes>
        </main>
        <FooterRectangle />
      </div>
    </DataContext.Provider>
  );
}

export default App;
