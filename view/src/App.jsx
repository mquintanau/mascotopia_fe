import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import Profile from "./pages/Profile/Profile";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";
import NavbarInternal from "./components/NavbarInternal/NavbarInternal";

function App() {
  return (
    <div className="h-screen w-screen bg-main text-black">
      <header>
        {/* Barra de navegación */}
        <NavbarInternal />
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* Prueba perfil */}
        </Routes>
      </main>
      <FooterRectangle />
    </div>
  );
}

export default App;
