import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil/Perfil";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import FooterRectangle from "./components/FooterRectangle/FooterRectangle";

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
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </main>
      <FooterRectangle />
    </div>
  );
}

export default App;
