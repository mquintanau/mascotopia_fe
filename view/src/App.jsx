import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Perfil from "./pages/Profile/Profile";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import Profile from "./pages/Profile/Profile";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";
import NavbarInternal from "./components/NavbarInternal/NavbarInternal";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="h-screen w-screen bg-main text-black">
      <header>
        {location.pathname === "/" && <NavbarExternal />}
        {location.pathname !== "/" && <NavbarInternal />}
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* Prueba perfil */}
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
      <FooterRectangle />
    </div>
  );
}

export default App;
