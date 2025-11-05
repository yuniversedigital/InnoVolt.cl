import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
// 💡 NUEVAS IMPORTACIONES: Proveedor del carrito y el componente del ícono
import { CartProvider } from "./pages/CartContext"; // Asegurarse de que el export sea CartProvider
import CartIcon from "./components/CartIcon";
import CatalogoGeneralPage from "./pages/CatalogoGeneralPage";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

// --- Importaciones de Páginas de InnoVolt ---
import QuienesSomosPage from "./pages/QuienesSomos";
import ElectricasPage from "./pages/ElectricasPage";
import FotovoltaicasPage from "./pages/FotovoltaicasPage";
import ElectromecanicasPage from "./pages/ElectromecanicasPage";
import PoliticasdePrivacidad from "./pages/PoliticasdePrivacidad";
import TerminosyCondiciones from "./pages/TerminosyCondiciones";
import InversoresPage from "./pages/InversoresPage";

import "./index.css";

export default function App() {
  return (
    // 1. Envolvemos todo con el CartProvider
    <CartProvider>
      <Router>
        {/* 2. Colocamos CartIcon aquí para que se muestre en todas las rutas */}
        <CartIcon />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/productos/inversores" element={<InversoresPage />} />

          {/* === RUTAS DE SERVICIOS INDEPENDIENTES === */}
          <Route path="/servicios/electricas" element={<ElectricasPage />} />
          <Route path="/catalogo" element={<CatalogoGeneralPage />} />
          <Route
            path="/servicios/fotovoltaicas"
            element={<FotovoltaicasPage />}
          />
          <Route
            path="/servicios/electromecanicas"
            element={<ElectromecanicasPage />}
          />

          {/* === RUTAS LEGALES === */}
          <Route
            path="/politicas-de-privacidad"
            element={<PoliticasdePrivacidad />}
          />
          <Route
            path="/terminos-y-condiciones"
            element={<TerminosyCondiciones />}
          />

          {/* Ruta que redirige a la página principal si no hay coincidencias */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
