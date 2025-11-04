import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import CatalogoGeneralPage from "./pages/CatalogoGeneralPage";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

// --- Importaciones de Páginas de InnoVolt ---
import QuienesSomosPage from "./pages/QuienesSomos";
import ElectricasPage from "./pages/ElectricasPage"; // NUEVO
import FotovoltaicasPage from "./pages/FotovoltaicasPage"; // NUEVO
import ElectromecanicasPage from "./pages/ElectromecanicasPage"; // NUEVO
import PoliticasdePrivacidad from "./pages/PoliticasdePrivacidad";
import TerminosyCondiciones from "./pages/TerminosyCondiciones";
import InversoresPage from "./pages/InversoresPage";
// Mantenemos el pago para servicios/auditorías

// --- Componentes antiguos eliminados ---
// Se eliminó: CartProvider, CartIcon, WebpayReturnPage, SuccessPage (antigua),
// Findetalleres, TerapeutasPage, ComunidadYLeadsPage.

import "./index.css";

export default function App() {
  return (
    // Se elimina <CartProvider> y cualquier lógica de carrito
    <Router>
      {/* Se elimina <CartIcon /> */}
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

        {/* --- Rutas de pago (para cotizaciones o auditorías pagadas) --- */}
        {/* Solo mantenemos la ruta final de confirmación/éxito */}

        {/* Ruta para el fallo del pago */}

        {/* Se eliminó: /staff-terapéutico, /pago-confirmacion-exito (duplicado), 
                    /nuestra-comunidad, /webpay-return */}

        {/* Ruta que redirige a la página principal si no hay coincidencias */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
