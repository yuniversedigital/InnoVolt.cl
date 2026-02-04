import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toZonedTime, format } from "date-fns-tz";
import { format as formatFns } from "date-fns";
import { 
  Wrench, 
  Calendar, 
  MapPin, 
  Car, 
  CheckCircle, 
  Phone 
} from "lucide-react";

// Zona horaria fija para Chile
const CHILE_TIME_ZONE = "America/Santiago";

interface ReservaConFechaProps {
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  serviceCategory: string;
  // 👇 Nueva prop para recibir la lista de beneficios desde la página padre
  includedBenefits?: string[]; 
  onClose: () => void;
  disponibilidadPorFechaDelServicio?: { [fecha: string]: string[] };
}

export default function ReservaConFecha({
  serviceTitle,
  servicePrice,
  serviceCategory,
  includedBenefits, // Recibimos la lista
  onClose,
  disponibilidadPorFechaDelServicio = {},
}: ReservaConFechaProps) {
  // Nota: Hemos quitado el hook useCart porque ahora iremos directo a WhatsApp

  const [fechaHora, setFechaHora] = useState<Date | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");

  // Estados para Vehículos
  const [tipoVehiculo, setTipoVehiculo] = useState<"Automóvil" | "Motocicleta" | string>("Automóvil");
  const [problema, setProblema] = useState<string>("");

  const handleSendWhatsapp = () => {
    // 1. Validaciones
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

    // Validación condicional para Electromecánica
    let datosVehiculo = "";
    if (serviceCategory === "Electromecánica") {
      if (!problema.trim()) {
        alert("Por favor, describe el problema que presenta el vehículo.");
        return;
      }
      datosVehiculo = `\n🚗 *Vehículo:* ${tipoVehiculo}\n⚠️ *Problema:* ${problema.trim()}`;
    }

    // 2. Procesar Fechas
    const zonedDate = toZonedTime(fechaHora, CHILE_TIME_ZONE);
    const fechaLegible = formatFns(zonedDate, "dd/MM/yyyy");
    const horaLegible = format(zonedDate, "HH:mm");
    const selectedDateString = format(zonedDate, "yyyy-MM-dd");

    // Validar disponibilidad (Mantenemos tu lógica original)
    const hoursForSelectedDay = disponibilidadPorFechaDelServicio?.[selectedDateString] || [];
    if (!hoursForSelectedDay.includes(horaLegible)) {
      alert("La hora seleccionada no está disponible. Por favor, revisa el calendario.");
      return;
    }

    // 3. Formatear la lista de beneficios para el mensaje
    const beneficiosTexto = includedBenefits && includedBenefits.length > 0
      ? `\n📋 *Incluye:*\n${includedBenefits.map((b) => `• ${b}`).join("\n")}`
      : "";

    // 4. Construir el Mensaje de WhatsApp
    const mensaje = `
👋 Hola InnoVolt, quiero agendar una visita técnica:

🔧 *Servicio:* ${serviceTitle}
💰 *Valor Base:* $${servicePrice.toLocaleString("es-CL")}
📅 *Fecha:* ${fechaLegible} a las ${horaLegible} hrs.
${beneficiosTexto}
${datosVehiculo}

📍 *Dirección:* ${direccion}

👤 *Mis Datos:*
*Nombre:* ${nombre}
*Teléfono:* ${telefono}
    `.trim();

    // 5. Enviar
    const numeroTelefono = "56912345678"; // ⚠️ REEMPLAZA CON TU NÚMERO
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`, "_blank");
    
    onClose();
  };

  // Filtros de Fecha (Tu lógica original intacta)
  const filterDay = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    const dateString = format(date, "yyyy-MM-dd");
    return (disponibilidadPorFechaDelServicio[dateString]?.length || 0) > 0;
  };

  const filterTimes = (time: Date) => {
    if (!fechaHora) return false;
    const selectedDateString = format(fechaHora, "yyyy-MM-dd");
    const hoursForThisDay = disponibilidadPorFechaDelServicio[selectedDateString];
    if (!hoursForThisDay || hoursForThisDay.length === 0) return false;
    const timeString = format(time, "HH:mm");
    return hoursForThisDay.includes(timeString);
  };

  return (
    <div className="reserva-con-fecha-modal bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden text-gray-800 animate-in fade-in zoom-in duration-200">
      
      {/* Encabezado Azul */}
      <div className="bg-blue-600 p-6 text-white text-center">
        <h3 className="text-2xl font-bold flex items-center justify-center">
          <Wrench className="mr-2 h-6 w-6" /> Agendar Visita
        </h3>
        <p className="text-blue-100 text-sm mt-1">{serviceTitle}</p>
      </div>

      {/* 💡 SECCIÓN NUEVA: Resumen de Beneficios (Visual) */}
      {includedBenefits && includedBenefits.length > 0 && (
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
          <p className="text-xs font-bold text-blue-800 uppercase mb-2 tracking-wide">
            Tu servicio incluye:
          </p>
          <ul className="grid grid-cols-1 gap-1">
            {includedBenefits.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-center text-xs text-gray-600">
                <CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0" />
                {b}
              </li>
            ))}
            {includedBenefits.length > 3 && (
               <li className="text-xs text-gray-400 italic ml-5">+ otros detalles técnicos</li>
            )}
          </ul>
        </div>
      )}

      <div className="p-6">
        <p className="text-md mb-4 text-center">
          Costo Base:{" "}
          <strong className="text-green-600 text-xl">
            ${servicePrice.toLocaleString()} CLP
          </strong>
        </p>

        {/* Selector de Fecha y Hora */}
        <label className="block text-sm font-bold mb-2 text-left text-gray-700">
          <Calendar className="inline h-4 w-4 mr-1 text-blue-500" /> Fecha y Hora (Chile):
        </label>
        <DatePicker
          selected={fechaHora}
          onChange={(date: Date | null) => setFechaHora(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          placeholderText="Selecciona disponibilidad..."
          className="border p-3 w-full mb-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          filterDate={filterDay}
          filterTime={filterTimes}
        />

        {/* CAMPOS ESPECÍFICOS PARA ELECTROMECÁNICA */}
        {serviceCategory === "Electromecánica" && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
            <h4 className="text-sm font-bold mb-3 flex items-center text-red-700">
              <Car className="w-4 h-4 mr-2" /> Datos del Vehículo
            </h4>
            <div className="space-y-3">
              <div>
                 <label className="block text-xs font-bold mb-1 text-gray-600">Tipo:</label>
                 <select
                  value={tipoVehiculo}
                  onChange={(e) => setTipoVehiculo(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-sm bg-white"
                >
                  <option>Automóvil</option>
                  <option>Motocicleta</option>
                  <option>Camioneta</option>
                  <option>Maquinaria Pesada</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-gray-600">Problema:</label>
                <textarea
                  rows={2}
                  value={problema}
                  onChange={(e) => setProblema(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  placeholder="Ej: Código de error P0300..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Dirección */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-left text-gray-700">
            <MapPin className="inline h-4 w-4 mr-1 text-blue-500" /> Dirección:
          </label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Calle, Número, Comuna"
          />
        </div>

        {/* Datos Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Tu Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Teléfono:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="+56 9..."
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="space-y-2">
            <button
            onClick={handleSendWhatsapp}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-md flex items-center justify-center transition-transform hover:-translate-y-0.5"
            >
            <Phone className="mr-2 h-5 w-5" /> Confirmar por WhatsApp
            </button>
            
            <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200"
            >
            Cancelar
            </button>
        </div>
      </div>
    </div>
  );
}