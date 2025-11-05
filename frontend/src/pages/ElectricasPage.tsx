import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Zap,
  ChevronRight,
  CheckCircle,
  Mail,
  Phone,
  Clock,
  DollarSign,
  Send,
  Wrench, // Icono para Servicios de Ingeniería
} from "lucide-react";
import VisitaFormModal from "../components/ReservaConFecha";

// --- Tipado para el componente de sección ---
interface VisitaTecnicaProps {
  // La prop debe ser tipada como una función que acepta un booleano y no devuelve nada
  setIsModalOpen: (isOpen: boolean) => void;
}
// ------------------------------------------

// --- DATOS ESPECÍFICOS DE ESTA PÁGINA ---
const serviceDetails = {
  // Renombramos a serviceDetails para evitar conflicto con la constante 'service' de abajo
  id: "visita-tecnica-electrica", // Nuevo ID para el servicio
  title: "Soluciones Eléctricas",
  serviceTitle: "Visita Técnica Eléctrica", // Título específico para el carrito
  price: 25000, // Precio de la visita técnica
  category: "Eléctricas", // Categoría para el carrito
  icon: Zap,
  color: "text-blue-600 border-blue-600",
  description:
    "Diseño, ejecución y mantenimiento de instalaciones eléctricas de baja tensión, garantizando la seguridad y optimización del consumo energético.",
  benefits: [
    "Instalación y certificación de tableros eléctricos.",
    "Corrección de factor de potencia y estudios de calidad de energía.",
    "Automatización industrial y residencial (domótica).",
    "Mantenimiento predictivo y correctivo de sistemas.",
  ],
  details:
    "Nuestros ingenieros garantizan que su infraestructura eléctrica cumpla con la normativa vigente (SEC/IEC) y opere con la máxima eficiencia, reduciendo el riesgo de fallas y paradas operacionales.",
  callToAction: "Solicite una Auditoría Eléctrica Gratuita",
};

// --- SECCIÓN VISITA TÉCNICA RÁPIDA (con tipado aplicado) ---
const VisitaTecnicaSection: React.FC<VisitaTecnicaProps> = ({
  setIsModalOpen,
}) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-xl shadow-md mb-8">
    <h3 className="text-2xl font-extrabold text-yellow-800 mb-3 flex items-center">
      <Clock className="w-6 h-6 mr-3" />
      Visita Técnica en Terreno (Diagnóstico)
    </h3>
    <p className="text-lg text-gray-700 mb-4">
      ¿Necesita un diagnóstico rápido, revisión de fallas o una cotización
      precisa? Un ingeniero se desplazará a su ubicación.
    </p>
    <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
      <div className="flex items-center space-x-3">
        <DollarSign className="w-6 h-6 text-green-600" />
        <span className="text-xl font-bold text-gray-900">$25.000 CLP</span>
      </div>
      <button
        onClick={() => setIsModalOpen(true)} // Llama a la prop para abrir el modal
        className="inline-flex items-center px-4 py-2 text-md font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        <Send className="w-5 h-5 mr-2" />
        Agendar Visita
      </button>
    </div>
    <p className="text-sm text-gray-500 mt-3">
      *Precio solo por diagnóstico. El valor es descontable de la cotización
      final del proyecto si se contrata el servicio.
    </p>
  </div>
);
// ----------------------------------------

// --- NUEVA SECCIÓN: ENLACE A SERVICIOS DEL CATÁLOGO ---
const ServiciosAdicionalesSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 mb-8">
    <h3 className="text-2xl font-extrabold text-blue-800 mb-4 flex items-center">
      <Wrench className="w-6 h-6 mr-3" />
      Servicios de Ingeniería en Catálogo
    </h3>
    <p className="text-lg text-gray-700 mb-4">
      Explore nuestros servicios de ingeniería eléctrica con precio fijo, como
      la **Certificación TE1**, o la **Corrección de Factor de Potencia**.
    </p>
    <Link
      to="/catalogo#servicios-section" // 💡 Enlace directo al ancla de servicios
      className="inline-flex items-center px-6 py-3 text-md font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
    >
      <ChevronRight className="w-5 h-5 mr-2" />
      Ver Servicios en Catálogo
    </Link>
  </div>
);
// ----------------------------------------

const ElectricasPage = () => {
  const navigate = useNavigate();
  const Icon = serviceDetails.icon; // Usamos serviceDetails

  // Estados principales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {" "}
      {/* Añadimos pt-20 para header fijo */}
      <header className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-2 flex items-center">
            <Icon className={`w-12 h-12 mr-3 ${serviceDetails.color}`} />
            {serviceDetails.title}
          </h1>
          <p className="text-xl font-light text-gray-300">
            {serviceDetails.description}
          </p>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna Principal de Contenido (2/3) */}
        <div className="lg:col-span-2">
          {/* 💡 CORRECCIÓN: Pasamos la función setIsModalOpen al componente de sección */}
          <VisitaTecnicaSection setIsModalOpen={setIsModalOpen} />

          {/* 👇 INTEGRACIÓN DE LA NUEVA SECCIÓN 👇 */}
          <ServiciosAdicionalesSection />
          {/* 👆 FIN DE LA NUEVA SECCIÓN 👆 */}

          <section className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-600 mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-7 h-7 mr-3 text-green-600" />
              Características Clave del Servicio
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {serviceDetails.details}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg text-gray-600 list-none">
              {serviceDetails.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight
                    className={`w-5 h-5 mr-2 mt-1 ${serviceDetails.color}`}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Columna Lateral (1/3) */}
        <aside className="lg:col-span-1">
          {/* Tarjeta de Contacto Rápido */}
          <div
            className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${serviceDetails.color.replace(
              "text-",
              "border-"
            )} mb-6`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Contacte a un Ingeniero
            </h3>
            <p className="text-gray-600 mb-4">
              {serviceDetails.callToAction} y reciba asesoría experta.
            </p>
            <a
              href="mailto:ventas@innovolt.cl"
              className="w-full inline-flex items-center justify-center px-4 py-2 mb-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar Solicitud
            </a>
            <a
              href="tel:+56912345678"
              className="w-full inline-flex items-center justify-center px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora
            </a>
          </div>

          {/* Navegación a Otros Servicios (Manualmente sin array de data) */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Otros Servicios
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/servicios/fotovoltaicas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  → Soluciones Fotovoltaicas
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/electromecanicas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  → Soluciones Electromecanicas
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="py-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="mt-10 mb-20 px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 block mx-auto font-semibold"
        >
          Volver al Inicio
        </button>
      </div>
      {/* INTEGRACIÓN DEL MODAL AL FINAL DEL COMPONENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <VisitaFormModal
            // 💡 Props del servicio de visita técnica
            serviceId={serviceDetails.id}
            serviceTitle={serviceDetails.serviceTitle}
            servicePrice={serviceDetails.price}
            serviceCategory={serviceDetails.category}
            onClose={() => setIsModalOpen(false)}
            // onSuccess ya no se usa porque el éxito se maneja en el CartIcon (Redirección)
            // Usamos una función simple para el modal (si lo necesitas)
          />
        </div>
      )}
      {/* Toast de Éxito (Mantenido, aunque la lógica es ahora en la redirección) */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-lg shadow-xl z-50 transition-opacity">
          ✅ ¡Visita agendada! Un ingeniero te contactará.
        </div>
      )}
    </div>
  );
};

export default ElectricasPage;
