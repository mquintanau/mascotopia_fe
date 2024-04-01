import Button from "./components/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import RectangularLogo from "./components/RectangularLogo/RectangularLogo";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

function App() {
  return (
    <div className="h-screen w-screen bg-main">
      <header>
        {/* Barra de navegación */}
        <Navbar />
      </header>
      <main className="h-[400px]">
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
