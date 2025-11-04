// src/components/VisitaFormModal.tsx

import React, { useState } from "react";
import {
  X,
  Send,
  User,
  Phone,
  MapPin,
  Clock,
  Mail,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useCart, ServicioContratado } from "../pages/CartContext";

interface VisitaFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

// ⚠️ Se mantiene la variable, aunque no se usa en la función, por si se usa en el componente.
const API_BASE_URL = (
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const VisitaFormModal: React.FC<VisitaFormModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { addToCart } = useCart();

  // 💡 Habilitamos isSubmitting para que el botón muestre 'Enviando...' si se desea.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
    monto: 25000,
    problema: "",
    fechaTentativa: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true); // Se activa el estado de envío (aunque es síncrono)

    // VALIDACIÓN
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.problema ||
      !formData.direccion
    ) {
      setError("Por favor, completa los campos obligatorios (*).");
      setIsSubmitting(false); // Desactiva si falla validación
      return;
    }

    if (formData.direccion.length < 5) {
      setError("Por favor, ingresa una dirección de servicio válida.");
      setIsSubmitting(false); // Desactiva si falla validación
      return;
    }

    // ----------------------------------------------------
    // 💡 LÓGICA CLAVE: CREAR EL OBJETO ServicioContratado Y AÑADIR AL CARRITO
    // ----------------------------------------------------
    const servicioVisita: ServicioContratado = {
      // Campos requeridos por la interfaz y compatibilidad con backend:
      servicio: "Visita Técnica Eléctrica (Diagnóstico)",
      categoria: "Eléctricas",
      precio: formData.monto,
      nombreCliente: formData.nombre,
      telefonoCliente: formData.telefono,

      // Placeholders requeridos por la interfaz ServicioContratado/Reserva:
      terapeuta: "Equipo InnoVolt",
      especialidad: "Eléctricas",
      sesiones: 1,
      cantidad: 1,

      // Datos de la Visita mapeados a campos opcionales:
      fecha: formData.fechaTentativa || "A CONVENIR",
      hora: "A CONVENIR",
      emailCliente: formData.email,
      remitenteNombre: formData.direccion, // DIRECCIÓN
      mensajePersonalizado: formData.problema, // PROBLEMA
    };

    addToCart(servicioVisita);
    onSuccess();
    onClose();

    setIsSubmitting(false); // Finaliza el estado de envío
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Agendar Visita Técnica ($25.000 CLP)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Alerta de Error */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Sección de Datos Personales */}
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
            1. Datos de Contacto *
          </h3>

          <div>
            <label
              htmlFor="nombre"
              className="text-gray-700 font-semibold flex items-center mb-1"
            >
              <User size={18} className="mr-2 text-blue-600" /> Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre Completo"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="telefono"
                className="text-gray-700 font-semibold flex items-center mb-1"
              >
                <Phone size={18} className="mr-2 text-blue-600" /> Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="+569..."
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold flex items-center mb-1"
              >
                <Mail size={18} className="mr-2 text-blue-600" /> Email
                (Opcional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="correo@ejemplo.cl"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Sección de Dirección (Texto Básico) */}
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 pt-3">
            2. Dirección del Servicio *
          </h3>

          <div>
            <label
              htmlFor="direccion"
              className="text-gray-700 font-semibold flex items-center mb-1"
            >
              <MapPin size={18} className="mr-2 text-blue-600" /> Dirección
              Completa
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Ej: Av. Principal 123, Comuna, Ciudad"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Fin de Sección de Dirección */}

          {/* Sección de Problema y Fecha */}
          <div>
            <label
              htmlFor="problema"
              className="text-gray-700 font-semibold flex items-center mb-1"
            >
              <Send size={18} className="mr-2 text-blue-600" /> Descripción del
              Problema
            </label>
            <textarea
              id="problema"
              name="problema"
              placeholder="Ej: Falla eléctrica intermitente en el tablero principal o necesito instalar un cargador EV."
              value={formData.problema}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="fechaTentativa"
              className="text-gray-700 font-semibold flex items-center mb-1"
            >
              <Clock size={18} className="mr-2 text-blue-600" /> Fecha Tentativa
              (Opcional)
            </label>
            <input
              type="date"
              id="fechaTentativa"
              name="fechaTentativa"
              value={formData.fechaTentativa}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Resumen de Pago */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
              <span className="flex items-center">
                <DollarSign size={24} className="mr-2 text-green-600" /> Costo
                del Diagnóstico:
              </span>
              <span>${formData.monto.toLocaleString()} CLP</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              *Este valor es por el diagnóstico y será descontado del costo
              final si contratas la reparación o proyecto.
            </p>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={isSubmitting} // Usamos isSubmitting
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Añadiendo al Carrito...
              </>
            ) : (
              <>
                <Send size={20} className="mr-2" />
                Añadir Visita al Carrito
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitaFormModal;
