import { useEffect, useRef, useState } from "react";
// 💡 Necesitamos 'useNavigate' para redirigir tras el éxito
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { ShoppingCart, Mail } from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const PHONE_NUMBER = "+56 996094015";

const CartIcon = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // 💡 Importamos el hook de navegación
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  // Función para solicitar cotización (simulación de envío a backend/email)
  const handleSolicitarCotizacion = async () => {
    if (!clientName || !clientEmail || !clientPhone) {
      alert("Por favor, complete sus datos de contacto para la cotización.");
      return;
    }

    setIsProcessing(true);
    setOpen(false);

    try {
      // 💡 Paso 1: Formatear los datos del carrito para el email/backend
      const cotizacionDetails = cart.map((item) => ({
        Producto: item.title,
        Opcion: item.optionLabel,
        Cantidad: item.quantity,
        PrecioUnitario: `$${item.price.toLocaleString("es-CL")} CLP`,
        Subtotal: `$${(item.price * item.quantity).toLocaleString(
          "es-CL"
        )} CLP`,
      }));

      const requestBody = {
        clientName,
        clientEmail,
        clientPhone,
        totalAmount: total,
        items: cotizacionDetails,
      };

      // 💡 Paso 2: Envío al endpoint de cotización (backend/cotizacionController.js)
      const response = await fetch(`${API_BASE_URL}/api/cotizacion/enviar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // En un entorno de producción, puedes capturar el mensaje de error del backend aquí.
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar la cotización.");
      }

      // 💡 Paso 3: Éxito (limpiar carrito y redirigir)
      // Ya NO usamos setShowToast(true) aquí
      clearCart();
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setShowForm(false);

      // 💡 REDIRECCIÓN A LA PÁGINA DE AGRADECIMIENTO
      navigate("/cotizacion-gracias");
    } catch (error) {
      console.error("Error al enviar la cotización:", error);
      alert(
        "No se pudo enviar la solicitud de cotización: " +
          (error instanceof Error ? error.message : "Error desconocido")
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Función para redirigir a WhatsApp con el contenido del carrito
  const handleSendViaWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    let message = `¡Hola InnoVolt! Quiero solicitar una cotización para los siguientes productos:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} (${
        item.optionLabel
      }) - Cantidad: ${item.quantity}\n`;
    });

    message += `\nTotal estimado: $${total.toLocaleString("es-CL")} CLP\n`;
    message += `\nMis datos de contacto (Opcional): Nombre: ${clientName}, Email: ${clientEmail}, Teléfono: ${clientPhone}`;

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Opcional: limpiar carrito después de enviar por WhatsApp
    clearCart();
    setOpen(false);
  };

  return (
    <div>
      {/* Icono del Carrito */}
      <div
        className="fixed top-4 right-4 z-50 cursor-pointer bg-blue-600 shadow-md p-2 rounded-full hover:bg-blue-700 text-white"
        onClick={() => {
          setOpen(!open);
          setShowForm(false);
        }}
      >
        <ShoppingCart size={24} />
        <span className="text-xs absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0.5 min-w-[18px] text-center transform translate-x-1/4 -translate-y-1/4">
          {cart.length}
        </span>
      </div>

      {/* Panel del Carrito (El resto del código del JSX es idéntico) */}
      {open && (
        <div
          ref={panelRef}
          className="fixed top-16 right-4 z-40 bg-white shadow-lg rounded-lg p-4 w-80 max-h-[80vh] overflow-y-auto"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            🛒 Solicitud de Cotización
          </h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No hay productos en la lista.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="border-b pb-3 flex justify-between items-start"
                >
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">
                      {item.title} ({item.optionLabel})
                    </p>
                    <p className="text-gray-500 text-xs">
                      Precio Unitario: ${item.price?.toLocaleString()} CLP
                    </p>
                    <button
                      className="mt-1 text-red-500 hover:text-red-700 text-xs underline"
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `¿Estás seguro de que deseas eliminar "${item.title} (${item.optionLabel})" de la lista?`
                        );
                        if (confirmDelete) {
                          removeFromCart(index);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="flex flex-col items-center ml-2">
                    {/* Control de Cantidad */}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value) || 0)
                      }
                      className="w-12 p-1 border rounded text-center text-gray-800 text-sm"
                    />
                    <p className="text-xs font-bold mt-1">
                      Subtotal: ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <>
              <div className="mt-4 pt-2 border-t text-right font-bold text-lg">
                Total Estimado: ${total.toLocaleString()} CLP
              </div>

              {/* Botón de solicitud/mostrar formulario */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 w-full py-2 rounded text-white bg-blue-600 hover:bg-blue-700 font-semibold flex items-center justify-center transition-colors"
                >
                  <Mail size={20} className="mr-2" />
                  Ingresar Contacto para Cotización
                </button>
              ) : (
                // Formulario de Contacto
                <div className="mt-4 p-3 border rounded-lg bg-gray-50 space-y-3">
                  <p className="text-xs text-center font-semibold text-gray-700">
                    Complete sus datos para enviar el detalle de la cotización.
                  </p>
                  <input
                    type="text"
                    placeholder="Su Nombre o Empresa"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2 border rounded text-gray-800 text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-2 border rounded text-gray-800 text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-2 border rounded text-gray-800 text-sm"
                    required
                  />

                  <button
                    onClick={handleSolicitarCotizacion}
                    disabled={isProcessing}
                    className={`w-full py-2 rounded text-white font-semibold ${
                      isProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isProcessing ? "Enviando..." : "Enviar Solicitud al Email"}
                  </button>

                  <p className="text-center text-xs text-gray-500 py-1">O</p>

                  <button
                    onClick={handleSendViaWhatsApp}
                    className="w-full py-2 rounded text-white bg-green-500 hover:bg-green-600 font-semibold"
                  >
                    Enviar por WhatsApp
                  </button>

                  <button
                    onClick={() => setShowForm(false)}
                    className="w-full py-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {/* Ya no usamos el Toast, pero lo dejamos vacío por si acaso: */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-transparent text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out z-50"></div>
      )}
    </div>
  );
};

export default CartIcon;
