
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="h-screen w-screen bg-main">
      <header>
        {/* Barra de navegación (Hay que agregarla en las paginas, para que no afecte la vista de la navbar cuando la sesion este iniciada)*/}
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* Prueba perfil */}
        </Routes>
      </main>
      <footer></footer>
    </div>

  );
}

export default App;
