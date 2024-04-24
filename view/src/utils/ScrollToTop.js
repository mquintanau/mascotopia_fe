import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Componente para hacer scroll al inicio de la página
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
