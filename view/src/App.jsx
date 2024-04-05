import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import { UserProfile } from "./pages/UserProfile";

function App() {
  return (
    <div className="h-screen w-screen bg-main">
      <header>
        {/* Barra de navegación */}
        <Navbar />
      </header>
      <main>
        {/* Contenido principal, manejando la navegacion con react-router-dom */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
