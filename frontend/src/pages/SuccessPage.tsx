import { CheckCircle, Copy, Mail, Zap } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Interfaz de detalles de compra actualizada para InnoVolt
interface PurchaseDetails {
  // Datos del Servicio/Cotización (coinciden con ServicioContratado)
  servicio: string; // Ej: "Solución Fotovoltaica"
  categoria: string; // Ej: "Fotovoltaica"
  fecha: string; // Fecha tentativa o de inicio
  hora: string; // Hora tentativa

  // Datos del Pago
  precio: string; // Monto total pagado

  // Datos del Cliente
  clienteNombre: string;
  clienteTelefono: string;
  clienteEmail?: string; // Nuevo campo para InnoVolt

  // Datos opcionales/heredados (si la lógica de GiftCard se mantuvo)
  remitenteNombre?: string;
  mensajePersonalizado?: string;
}

// URL base del backend para la consulta
const API_BASE_URL = (
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<string>("");

  // 🐛 CORRECCIÓN: Se eliminan las declaraciones de estado y funciones no utilizadas.
  // const [transactionId, setTransactionId] = useState<string>("");
  // const [clientEmailInput, setClientEmailInput] = useState<string>("");
  // const [emailStatus, setEmailStatus] = useState<string>("");

  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseOrder, setPurchaseOrder] = useState<string>("");

  // FUNCIÓN CLAVE: Consulta al Backend para obtener detalles
  const fetchPurchaseDetails = useCallback(
    async (token: string, id: string) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/webpay/details?token=${token}&transactionId=${id}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "No se pudo obtener el detalle de la compra."
          );
        }

        const data = await response.json();

        const mappedDetails: PurchaseDetails = {
          servicio: data.reservas[0]?.servicio || "Servicio Contratado",
          categoria: data.reservas[0]?.categoria || "General",
          fecha: data.reservas[0]?.fecha || "Pendiente",
          hora: data.reservas[0]?.hora || "Pendiente",
          precio: data.monto.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          }),
          clienteNombre:
            data.clienteNombre ||
            data.reservas[0]?.nombreCliente ||
            "Cliente InnoVolt",
          clienteTelefono:
            data.clienteTelefono || data.reservas[0]?.telefonoCliente || "N/A",
          clienteEmail:
            data.clienteEmail || data.reservas[0]?.emailCliente || "",
          remitenteNombre: data.reservas[0]?.remitenteNombre,
          mensajePersonalizado: data.reservas[0]?.mensajePersonalizado,
        };

        setPurchaseDetails(mappedDetails);
        setPurchaseOrder(data.ordenCompra || "N/A");
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Hubo un error al cargar los detalles de la compra.");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const receivedToken = params.get("token_ws") || params.get("TBK_TOKEN");
    const receivedTransactionId = params.get("transactionId");

    if (receivedToken && receivedTransactionId) {
      setToken(receivedToken);
      // setTransactionId(receivedTransactionId); // 🐛 CORRECCIÓN: Eliminada variable no usada
      fetchPurchaseDetails(receivedToken, receivedTransactionId);
    } else {
      setError("Faltan parámetros clave (Token o ID de Transacción).");
      setIsLoading(false);
    }
  }, [location.search, fetchPurchaseDetails]);

  // Función para copiar al portapapeles
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess("¡Copiado!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  // 🐛 CORRECCIÓN: Se elimina la función handleResendEmail ya que no se usa en este frontend
  // const handleResendEmail = async () => { ... }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <p className="text-xl text-blue-600">
          Cargando detalles de la transacción...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-red-50">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center border-t-4 border-red-500">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error de Confirmación
          </h1>
          <p className="text-lg text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-gray-50">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl w-full text-center border-t-8 border-green-500">
        <CheckCircle size={60} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          ¡Transacción Exitosa!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Gracias por confiar en **InnoVolt**. Su cotización/servicio ha sido
          confirmado.
        </p>

        {/* Bloque de Detalles de la Cotización */}
        <div className="bg-blue-50 p-6 rounded-lg text-left mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
            Detalles del Servicio Contratado
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
            <p>
              <strong>Servicio:</strong> {purchaseDetails?.servicio}
            </p>
            <p>
              <strong>Categoría:</strong> {purchaseDetails?.categoria}
            </p>
            <p>
              <strong>Monto Pagado:</strong>{" "}
              <span className="text-green-600 font-bold">
                {purchaseDetails?.precio}
              </span>
            </p>

            {purchaseOrder !== "N/A" && (
              <p>
                <strong>Orden de Compra:</strong>
                <span className="ml-2 font-medium">{purchaseOrder}</span>
              </p>
            )}

            {purchaseDetails?.fecha &&
              purchaseDetails?.fecha !== "Pendiente" && (
                <p>
                  <strong>Fecha Tentativa:</strong> {purchaseDetails.fecha} (
                  {purchaseDetails.hora})
                </p>
              )}
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm">
              <strong>Referencia Webpay (Token):</strong>
              <span className="font-mono text-xs bg-gray-200 p-1 rounded ml-2 inline-flex items-center">
                {token}
                {/* 🐛 CORRECCIÓN: Se elimina la propiedad 'title' que causaba el error 2322 */}
                <Copy
                  size={14}
                  className="ml-1 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleCopy(token)}
                  aria-label="Copiar Token" // Usamos aria-label por accesibilidad
                />
              </span>
              {copySuccess && (
                <span className="ml-2 text-green-500 text-xs">
                  {copySuccess}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Bloque de Próximos Pasos (El mensaje clave de InnoVolt) */}
        <div className="p-4 rounded-lg text-gray-700 border-l-4 border-blue-600 bg-white shadow-inner mb-8">
          <p className="font-semibold mb-2">Próximos Pasos:</p>
          <p className="text-md leading-relaxed">
            Nuestro equipo de ingeniería revisará los detalles de su pago. **En
            las próximas 24 horas hábiles**, un ejecutivo de **InnoVolt** se
            comunicará con **{purchaseDetails?.clienteNombre}** al teléfono **
            {purchaseDetails?.clienteTelefono}** o correo **
            {purchaseDetails?.clienteEmail || "No Proporcionado"}** para
            confirmar la fecha de inicio del proyecto o el servicio técnico.
          </p>
          <p className="mt-4 text-sm text-blue-600">
            *Por favor, revise su correo (incluyendo la carpeta SPAM) donde
            encontrará una copia de este comprobante.
          </p>
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Zap size={20} className="mr-2" />
            Volver a InnoVolt
          </button>
          <a
            href="mailto:ventas.innovolt@gmail.com"
            className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={20} className="mr-2" />
            Enviar Correo al Equipo
          </a>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
