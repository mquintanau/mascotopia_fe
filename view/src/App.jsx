
import Navbar from "./components/Navbar/Navbar";
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
