
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import NavbarExternal from "./components/NavbarExternal/NavbarExternal";

function App() {
  return (
    <div className="h-screen w-screen bg-main">
      <header>
        {/* Barra de navegación */}
        <NavbarExternal />
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer></footer>
    </div>

  );
}

export default App;
