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
  // 💡 ADECUACIÓN: Enfocamos el título en la ingeniería y el montaje.
  title: "Ingeniería y Montaje de Sistemas Solares FV",
  icon: Sun,
  color: "text-yellow-500 border-yellow-500",
  description:
    // 💡 ADECUACIÓN: Énfasis en el diseño, ejecución y cumplimiento normativo.
    "Expertos en el diseño, ejecución y mantenimiento de proyectos solares fotovoltaicos 'On Grid' y 'Off Grid', asegurando la máxima eficiencia y cumplimiento normativo.",

  benefits: [
    // 💡 ADECUACIÓN: Énfasis en la ejecución integral.
    "Diseño y Montaje de sistemas fotovoltaicos hasta 10 kW (Autoconsumo residencial/comercial).",
    "Proyectos 'Llave en Mano' para sistemas residenciales y comerciales (Net Billing).",
    "Diseño e Integración de Sistemas de Almacenamiento de Energía (BESS) en proyectos específicos.",
    "Asesoría regulatoria integral, incluyendo trámites de conexión e inyección a la red ", // Clarifica que la certificación es Clase D
  ],
  details:
    // 💡 ADECUACIÓN: Se menciona el suministro de equipos como parte del servicio integral.
    "Nuestro servicio es integral. Cubrimos desde la ingeniería conceptual y la evaluación de viabilidad, el suministro de equipos, hasta el montaje y monitoreo remoto, garantizando una transformación energética como inversión.",
  callToAction: "Solicite su Estudio de Viabilidad Solar",
};
// ----------------------------------------

const FotovoltaicasPage = () => {
  const navigate = useNavigate();
  const Icon = service.icon;
  const CatalogLinkSection = () => (
    // 💡 NUEVA SECCIÓN DE ENLACE A CATÁLOGO
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-2">Equipos Clave</h3>
      <Link
        to="/inversores"
        className="flex items-center justify-center bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors font-semibold"
      >
        <Package className="w-5 h-5 mr-2" />
        Ver Catálogo de Inversores y Componentes
      </Link>
      <p className="text-sm text-gray-500 mt-2">
        Recuerde: Suministramos equipos solo para nuestros proyectos de montaje.
      </p>
    </div>
  );

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <header className={`bg-white shadow-md border-b-4 ${service.color} py-8`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center">
          <Icon className={`w-16 h-16 mr-4 ${service.color.split(" ")[0]}`} />
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              {service.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">{service.description}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:space-x-8">
        {/* Contenido Principal (Detalles del Servicio) */}
        <main className="lg:w-2/3">
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-yellow-500" />
              Nuestras Capacidades
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {service.details}
            </p>
            <ul className="space-y-3 pl-5 list-none">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <ChevronRight className="w-5 h-5 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            {/* Llamada a la Acción Principal */}
            <div className="mt-8">
              <Link
                to="/contacto"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                {service.callToAction}
              </Link>
            </div>
          </section>

          {/* 💡 Sección de Enlace a Catálogo */}
          {CatalogLinkSection()}
        </main>

        {/* Barra Lateral (Contacto y Navegación) */}
        <aside className="lg:w-1/3 mt-12 lg:mt-0 space-y-8">
          {/* Contacto Directo */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ¿Tiene un Proyecto Urgente?
            </h3>
            <a
              href={`mailto:ventas.innovolt@gmail.com
`}
              className="flex items-center justify-center mb-3 px-4 py-2 rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar Email
            </a>
            <a
              href="tel:+56923680476"
              className="flex items-center justify-center px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora
            </a>
          </div>

          {/* Navegación a Otros Servicios */}
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
