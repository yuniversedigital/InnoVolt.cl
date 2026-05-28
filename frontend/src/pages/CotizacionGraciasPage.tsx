import React from "react";
import { CheckCircle, Phone, Mail, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PHONE_NUMBER = "+56 9 2368 0476";
const EMAIL = "ventas.innovolt@gmail.com"
;

function CotizacionGraciasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-8 border-blue-600">
        {/* Ícono de Confirmación */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          ¡Solicitud Recibida con Éxito!
        </h1>

        <p className="text-xl text-gray-700 mb-8">
          Gracias por contactar a InnoVolt Ingeniería.
        </p>

        <div className="text-left bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-3">
            ¿Qué sucede ahora?
          </h2>
          <p className="text-gray-700 mb-4">
            Nuestro equipo de técnicos ha recibido el detalle de su
            cotización.
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <span className="font-bold mr-2 text-blue-600">→</span>
              Revisaremos los detalles y el stock de los productos/servicios
              solicitados.
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2 text-blue-600">→</span>
              Le **contactaremos en las próximas 24 horas hábiles** al teléfono
              o correo proporcionado.
            </li>
          </ul>
        </div>

        {/* Información de Contacto Directo */}
        <p className="text-sm text-gray-600 mt-4 mb-6">
          Si necesita atención inmediata, contáctenos directamente:
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            <Phone size={20} className="mr-1" /> Llamar
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            <Mail size={20} className="mr-1" /> Correo
          </a>
        </div>

        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold flex items-center justify-center mx-auto"
          >
            <Home size={20} className="mr-2" />
            Volver al Inicio de InnoVolt
          </button>
        </div>
      </div>
    </div>
  );
}

export default CotizacionGraciasPage;
