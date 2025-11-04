import { useNavigate, Link } from "react-router-dom";
import {
  Zap,
  Sun,
  Wrench,
  Package,
  ChevronRight,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";

// --- DATOS ESPECÍFICOS DE ESTA PÁGINA ---
const serviceId = "fotovoltaicas";
const service = {
  title: "Soluciones Fotovoltaicas",
  icon: Sun,
  color: "text-yellow-500 border-yellow-500",
  description:
    "Implementación de sistemas de energía solar fotovoltaica 'On Grid' y 'Off Grid' para la generación de energía limpia y la reducción de costos a largo plazo.",
  benefits: [
    "Diseño y montaje de plantas solares a escala industrial.",
    "Instalación de paneles solares residenciales (Net Billing).",
    "Sistemas de almacenamiento de energía (BESS).",
    "Asesoría en financiamiento y trámites de inyección a la red.",
  ],
  details:
    "Transforme su consumo energético en una inversión. Ofrecemos soluciones llave en mano, desde la evaluación inicial de viabilidad hasta la puesta en marcha y monitoreo de su sistema solar.",
  callToAction: "Solicite su Estudio de Viabilidad Solar",
};
// ----------------------------------------

const FotovoltaicasPage = () => {
  const navigate = useNavigate();
  const Icon = service.icon;
  const CatalogLinkSection = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
        <Package className="w-6 h-6 mr-3 text-yellow-600" />
        Venta Directa de Componentes
      </h3>
      <p className="text-gray-700 mb-4">
        ¿Solo necesita los paneles? Revise nuestro catálogo completo con
        detalles técnicos y precios.
      </p>
      <Link
        to="/productos/paneles"
        className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Sun size={18} className="mr-2" />
        Ver Catálogo de Paneles
      </Link>
    </div>
  );

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Header de la Página */}
      <header className="bg-gray-800 text-white py-12 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-2 flex items-center">
            <Icon className={`w-12 h-12 mr-3 ${service.color}`} />
            {service.title}
          </h1>
          <p className="text-xl font-light text-gray-300">
            {service.description}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna Principal de Contenido (2/3) */}
        <div className="lg:col-span-2">
          <section className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-yellow-500 mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-7 h-7 mr-3 text-green-600" />
              Características Clave del Servicio
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {service.details}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg text-gray-600 list-none">
              {service.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight
                    className={`w-5 h-5 mr-2 mt-1 ${service.color}`}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        </div>
          <CatalogLinkSection />
        {/* Columna Lateral (1/3) */}
        <aside className="lg:col-span-1">
          {/* Tarjeta de Contacto Rápido */}
          <div
            className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${service.color.replace(
              "text-",
              "border-"
            )} mb-6`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Contacte a un Ingeniero
            </h3>
            <p className="text-gray-600 mb-4">
              {service.callToAction} y reciba asesoría experta.
            </p>

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
                  to="/servicios/electricas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  → Soluciones Eléctricas
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios/electromecanicas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  → Soluciones Electromecánicas
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
    </div>
  );
};

export default FotovoltaicasPage;
