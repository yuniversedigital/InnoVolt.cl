// src/pages/PaymentFailurePage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react"; // Iconos de soporte

const EMAIL_SOPORTE = "ventas.innovolt@gmail.com";

function PaymentFailurePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el token y el código de error de la URL
    const params = new URLSearchParams(location.search);
    const receivedToken = params.get("token");
    const receivedErrorCode = params.get("code") || params.get("error"); // Captura 'code' o 'error'

    setToken(receivedToken || null);
    setErrorCode(receivedErrorCode || null);
  }, [location]);

  // Función para reintentar (simplemente navega a la Home o al inicio del proceso)
  const handleRetry = () => {
    // En un sistema real, se redirigiría al paso anterior (ej., carrito/checkout)
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 pt-20">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full border-t-8 border-red-600">
        <AlertTriangle size={60} className="text-red-600 mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Fallo en el Procesamiento de Pago
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          La transacción no pudo ser completada. Por favor, verifica la
          información de tu tarjeta e inténtalo de nuevo.
        </p>

        {/* Detalles del Error */}
        <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200 text-left">
          {errorCode && (
            <p className="text-sm text-gray-800 mb-2">
              <strong className="text-red-700">Código de Error:</strong>{" "}
              <span className="font-mono">{errorCode}</span>
            </p>
          )}
          {token && (
            <p className="text-sm text-gray-800">
              <strong className="text-red-700">Referencia:</strong>{" "}
              <span className="font-mono">{token}</span>
            </p>
          )}
        </div>

        <p className="text-md text-gray-600 mb-8">
          Si el problema persiste, contacta a nuestro equipo de soporte técnico
          con la **Referencia** anterior.
        </p>

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold flex items-center justify-center w-full"
          >
            <RefreshCw size={20} className="mr-2" />
            Reintentar Pago
          </button>

          <a
            href={`mailto:${EMAIL_SOPORTE}?subject=Fallo%20de%20Pago%20InnoVolt%20(Ref:%20${
              token || "N/A"
            })`}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold flex items-center justify-center w-full"
          >
            <Mail size={20} className="mr-2" />
            Contactar a Soporte
          </a>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 font-semibold flex items-center justify-center w-full"
          >
            <Home size={20} className="mr-2" />
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailurePage;
