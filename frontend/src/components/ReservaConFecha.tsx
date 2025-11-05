// ReservaConFecha.tsx

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Use the correct import for the timezone functions
import { toZonedTime, format } from "date-fns-tz";
import { format as formatFns } from "date-fns";
// 💡 CORRECCIÓN: Añadimos ShoppingCart e importamos solo los iconos utilizados.
import { useCart } from "../pages/CartContext";
// 💡 Importamos Wrench, Calendar, ShoppingCart, MapPin, y Car para los iconos.
import { Wrench, Calendar, ShoppingCart, MapPin, Car } from "lucide-react";

// Define a fixed time zone for Chile
const CHILE_TIME_ZONE = "America/Santiago";

// 💡 Interfaz simplificada para las propiedades del modal
interface ReservaConFechaProps {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  serviceCategory: string;

  onClose: () => void;
  disponibilidadPorFechaDelServicio?: { [fecha: string]: string[] };
}

export default function ReservaConFecha({
  serviceId,
  serviceTitle,
  servicePrice,
  serviceCategory,
  onClose,
  disponibilidadPorFechaDelServicio = {},
}: ReservaConFechaProps) {
  const { addToCart } = useCart();
  const [fechaHora, setFechaHora] = useState<Date | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");

  // 💡 NUEVOS ESTADOS PARA VEHÍCULOS
  const [tipoVehiculo, setTipoVehiculo] = useState<
    "Automóvil" | "Motocicleta" | string
  >("Automóvil");
  const [problema, setProblema] = useState<string>("");

  const handleConfirm = () => {
    // 1. Validaciones generales
    if (!fechaHora) {
      alert("Por favor, selecciona fecha y hora para la visita.");
      return;
    }
    if (!nombre.trim() || !telefono.trim()) {
      alert("Por favor, ingresa tu nombre y número de teléfono.");
      return;
    }
    if (!direccion.trim()) {
      alert("Por favor, ingresa la dirección de la visita.");
      return;
    }

    // 2. Validación CONDICIONAL para ELECTROMECÁNICA
    let vehicleDetails = "";
    if (serviceCategory === "Electromecánica") {
      if (!problema.trim()) {
        alert("Por favor, describe el problema que presenta el vehículo.");
        return;
      }
      vehicleDetails = ` | Vehículo: ${tipoVehiculo} | Problema: ${problema.trim()}`;
    }

    // --- 3. Obtener strings de Fecha/Hora en zona horaria de Chile ---
    const zonedDate = toZonedTime(fechaHora, CHILE_TIME_ZONE);
    const selectedTimeString = format(zonedDate, "HH:mm");
    // const selectedDateString = format(zonedDate, "yyyy-MM-dd"); // No se usa directamente aquí

    // --- (Validación de Disponibilidad omitida por brevedad, asumiendo que es correcta) ---
    const selectedDateString = format(zonedDate, "yyyy-MM-dd");
    const hoursForSelectedDay =
      disponibilidadPorFechaDelServicio?.[selectedDateString] || [];
    if (!hoursForSelectedDay.includes(selectedTimeString)) {
      alert(
        "La hora seleccionada no está disponible. Por favor, revisa el calendario."
      );
      return;
    }

    // 4. Preparamos el detalle final para el carrito
    const direccionStr = `[Dir: ${direccion}]`;

    const item = {
      id: serviceId,
      title: serviceTitle,
      category: serviceCategory,
      price: servicePrice,
      quantity: 1,
      // 💡 ALMACENAMIENTO CLAVE: Incluimos la dirección y los detalles del vehículo si existen
      optionLabel: `Visita el ${formatFns(
        zonedDate,
        "dd/MM/yyyy"
      )} a las ${selectedTimeString} hrs. (Cliente: ${nombre}) ${direccionStr}${vehicleDetails}`,
    };

    addToCart(item);
    alert(
      `✅ Visita técnica añadida: ${serviceTitle} el ${formatFns(
        zonedDate,
        "dd/MM/yyyy"
      )} a las ${selectedTimeString} hrs.`
    );
    onClose();
  };

  const filterDay = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return false;
    }

    // Filtra los días que tienen horas disponibles en el objeto
    const dateString = format(date, "yyyy-MM-dd");
    return (disponibilidadPorFechaDelServicio[dateString]?.length || 0) > 0;
  };

  const filterTimes = (time: Date) => {
    if (!fechaHora) {
      return false;
    }

    // Obtener la fecha seleccionada para obtener las horas disponibles
    const selectedDateString = format(fechaHora, "yyyy-MM-dd");
    const hoursForThisDay =
      disponibilidadPorFechaDelServicio[selectedDateString];

    if (!hoursForThisDay || hoursForThisDay.length === 0) {
      return false;
    }

    // Convertir la hora a string "HH:mm" para la comparación
    const timeString = format(time, "HH:mm");

    return hoursForThisDay.includes(timeString);
  };

  return (
    <div className="reserva-con-fecha-modal p-6 rounded-lg shadow-2xl bg-white text-gray-800 border-t-4 border-blue-600">
      <h3 className="text-2xl font-bold mb-4 text-center text-blue-800 flex items-center justify-center">
        <Wrench className="mr-2 h-6 w-6" /> Agendar Visita Técnica
      </h3>
      <p className="text-lg mb-2 text-center">
        Servicio: <strong>{serviceTitle}</strong>
      </p>
      <p className="text-md mb-4 text-center">
        Costo Base:{" "}
        <strong className="text-green-700">
          ${servicePrice.toLocaleString()} CLP
        </strong>
      </p>

      {/* Selector de Fecha y Hora */}
      <label
        htmlFor="fechaHora"
        className="block text-sm font-bold mb-2 text-left"
      >
        <Calendar className="inline h-4 w-4 mr-1 text-blue-500" /> Fecha y Hora
        (Chile):
      </label>
      <DatePicker
        selected={fechaHora}
        onChange={(date: Date | null) => setFechaHora(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60} // Ajustado a intervalos de 60 minutos para visitas
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        placeholderText="SELECCIONA una fecha y hora disponible"
        className="border p-2 w-full mt-1 mb-4 border-gray-300 rounded-md focus:ring-blue-500"
        filterDate={filterDay}
        filterTime={filterTimes}
      />

      {/* 💡 CAMPOS ESPECÍFICOS PARA ELECTROMECÁNICA (VEHÍCULOS) */}
      {serviceCategory === "Electromecánica" && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
          <h4 className="text-md font-bold mb-3 flex items-center text-red-700">
            <Car className="w-5 h-5 mr-2" /> Datos del Vehículo
          </h4>

          {/* Selector de Tipo de Vehículo */}
          <div className="mb-4">
            <label
              htmlFor="tipoVehiculo"
              className="block text-sm font-bold mb-2 text-left"
            >
              Tipo de Unidad:
            </label>
            <select
              id="tipoVehiculo"
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Automóvil</option>
              <option>Motocicleta</option>
              <option>Camioneta</option>
              <option>Maquinaria Pesada</option>
            </select>
          </div>

          {/* Input de Problema */}
          <div className="mb-2">
            <label
              htmlFor="problemaVehiculo"
              className="block text-sm font-bold mb-2 text-left"
            >
              Describa el problema que presenta (requerido):
            </label>
            <textarea
              id="problemaVehiculo"
              rows={3}
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ej: El motor presenta un código de error P0300 y tironea en baja velocidad."
            />
          </div>
        </div>
      )}
      {/* FIN CAMPOS ELECTROMECÁNICA */}

      {/* 💡 NUEVO CAMPO: Dirección de la Visita */}
      <div className="mb-4">
        <label
          htmlFor="direccionVisita"
          className="block text-sm font-bold mb-2 text-left"
        >
          <MapPin className="inline h-4 w-4 mr-1 text-blue-500" /> Dirección
          exacta de la Visita:
        </label>
        <input
          type="text"
          id="direccionVisita"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: Calle Principal 123, Comuna, Región"
        />
        <p className="text-xs text-gray-500 mt-1">
          Asegúrese de incluir la comuna y región para agilizar el diagnóstico.
        </p>
      </div>

      {/* Campos del Cliente (Tu Nombre/Empresa y Teléfono) */}
      <div className="mb-4">
        <label
          htmlFor="nombreCliente"
          className="block text-sm font-bold mb-2 text-left"
        >
          Tu Nombre/Empresa:
        </label>
        <input
          type="text"
          id="nombreCliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Ej: Juan Pérez / Empresa XYZ"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="telefonoCliente"
          className="block text-sm font-bold mb-2 text-left"
        >
          Tu Número de Teléfono
        </label>
        <input
          type="tel"
          id="telefonoCliente"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ej: +56912345678"
        />
      </div>

      <button
        onClick={handleConfirm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full font-semibold flex items-center justify-center"
      >
        <ShoppingCart className="mr-2 h-5 w-5" /> Agregar Visita a Cotización
      </button>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full mt-2"
      >
        Cancelar
      </button>
    </div>
  );
}
