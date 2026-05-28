import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation, // 1. Importamos useLocation
} from "react-router-dom";
import React from "react";

import { CartProvider } from "./pages/CartContext";
import CartIcon from "./components/CartIcon";
import ScrollToTop from "./components/ScrollToTop";

// --- Páginas ---
import LandingHub from "./pages/LandingHub";
import DigitalHome from "./pages/DigitalHome";
import ElectricalHome from "./pages/Home"; // Tu antiguo Home.jsx

import QuienesSomosPage from "./pages/QuienesSomos";
import CatalogoGeneralPage from "./pages/CatalogoGeneralPage";
import InversoresPage from "./pages/InversoresPage";
import ElectricasPage from "./pages/ElectricasPage";
import FotovoltaicasPage from "./pages/FotovoltaicasPage";
import ElectromecanicasPage from "./pages/ElectromecanicasPage";
import PoliticasdePrivacidad from "./pages/PoliticasdePrivacidad";
import TerminosyCondiciones from "./pages/TerminosyCondiciones";

import "./index.css";
import PortfolioPage from "./pages/PortfolioPages";

// 💡 COMPONENTE AUXILIAR: Controla qué elementos globales se ven según la ruta
const GlobalElements = () => {
  const location = useLocation();
  
  // Lista de rutas donde NO queremos ver el carrito
  const hideCartPaths = ["/digital", "/portafolio", "/"];
  
  // Verificamos si la ruta actual está en la lista de ocultos
  const showCart = !hideCartPaths.includes(location.pathname);

  return (
    <>
      {/* Solo mostramos el CartIcon si showCart es true */}
      {showCart && <CartIcon />}
      <ScrollToTop />
    </>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        {/* 👇 Aquí insertamos el controlador de elementos globales */}
        <GlobalElements />

        <Routes>
          {/* HUB CENTRAL */}
          <Route path="/" element={<ElectricalHome/>} />

          {/* MUNDO DIGITAL (Sin Carrito) */}
          <Route path="/digital" element={<DigitalHome />} />
{/* 👇 NUEVA RUTA DE PORTAFOLIO INDEPENDIENTE */}
          <Route path="/portafolio" element={<PortfolioPage />} />
          {/* MUNDO FÍSICO / ELÉCTRICO */}
          <Route path="/electricidad" element={<ElectricalHome />} />
          
          {/* Resto de rutas */}
          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/catalogo" element={<CatalogoGeneralPage />} />
          <Route path="/productos/inversores" element={<InversoresPage />} />
          <Route path="/servicios/electricas" element={<ElectricasPage />} />
          <Route path="/servicios/fotovoltaicas" element={<FotovoltaicasPage />} />
          <Route path="/servicios/electromecanicas" element={<ElectromecanicasPage />} />
          <Route path="/politicas-de-privacidad" element={<PoliticasdePrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosyCondiciones />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}