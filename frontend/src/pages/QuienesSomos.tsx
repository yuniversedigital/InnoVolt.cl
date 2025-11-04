import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Users,
  Zap,
  Compass,
  Target,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// NOTA: Se eliminan las referencias a Directora1 y Webpayplus (assets del proyecto anterior).
// Si quieres mostrar fotos del equipo, deberás crear assets nuevos (ej: EquipoFundador.jpg).

// 1. SECCIÓN PRINCIPAL: Quiénes Somos (La Identidad)
const QuienesSomosSection = () => (
  <section id="quienes-somos" className="py-16 px-6 max-w-6xl mx-auto">
    <h1 className="text-5xl font-extrabold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
      Quiénes Somos
    </h1>
    <div className="md:flex md:space-x-12 items-start">
      <div className="md:w-2/3">
        <h2 className="text-3xl font-bold text-blue-600 mb-4 flex items-center">
          <Lightbulb className="w-8 h-8 mr-3" />
          Ingeniería, Innovación y Compromiso
        </h2>
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          **Somos InnoVolt**, una empresa de ingeniería de vanguardia
          especializada en la entrega de soluciones integrales para los sectores
          eléctrico, fotovoltaico y electromecánico. Desde nuestro inicio, nos
          hemos comprometido a impulsar la eficiencia operativa y la
          sostenibilidad de nuestros clientes.
        </p>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Nuestro equipo está formado por ingenieros y técnicos altamente
          cualificados, apasionados por resolver los desafíos más complejos de
          la industria con metodologías innovadoras y un estricto apego a los
          más altos estándares de calidad y seguridad.
        </p>
      </div>
      <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-inner mt-8 md:mt-0">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          ¿Por qué elegirnos?
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <Zap className="w-5 h-5 mr-2 text-blue-500 mt-1 flex-shrink-0" />{" "}
            Experiencia comprobada en el sector.
          </li>
          <li className="flex items-start">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500 mt-1 flex-shrink-0" />{" "}
            Enfoque en la eficiencia energética.
          </li>
          <li className="flex items-start">
            <ShieldCheck className="w-5 h-5 mr-2 text-blue-500 mt-1 flex-shrink-0" />{" "}
            Garantía en la calidad de la instalación.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

// 2. SECCIÓN DE MISIÓN Y VISIÓN (Propósito y Dirección)
const MisionVisionSection = () => (
  <section id="mision-vision" className="py-16 bg-blue-50">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Columna Misión */}
      <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <Compass className="w-7 h-7 mr-3 text-blue-600" />
          Nuestra Misión
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          Proveer soluciones de ingeniería eléctrica, fotovoltaica y
          electromecánica de la más alta calidad, maximizando el valor para
          nuestros clientes a través de la innovación, el servicio personalizado
          y la ejecución impecable de cada proyecto.
        </p>
      </div>

      {/* Columna Visión */}
      <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600">
        <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <Target className="w-7 h-7 mr-3 text-green-600" />
          Nuestra Visión
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          Ser reconocidos como el líder en el mercado nacional en soluciones de
          ingeniería eléctrica sostenible, siendo el socio estratégico preferido
          por las empresas que buscan eficiencia y tecnología de futuro.
        </p>
      </div>
    </div>
  </section>
);

// 3. SECCIÓN DE VALORES (Credibilidad y Ética)
const ValoresClaveSection = () => (
  <section id="valores" className="py-16 px-6 max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-10">
      Valores Fundamentales
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="p-6">
        <Lightbulb className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Innovación</h3>
        <p className="text-gray-600">
          Aplicamos tecnología de punta para crear soluciones inteligentes y
          eficientes que anticipan las necesidades del mercado.
        </p>
      </div>
      <div className="p-6">
        <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Integridad</h3>
        <p className="text-gray-600">
          Trabajamos con total transparencia, honestidad y ética profesional en
          todas nuestras interacciones y proyectos.
        </p>
      </div>
      <div className="p-6">
        <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
        <p className="text-gray-600">
          Estamos dedicados a la seguridad, la calidad y la satisfacción total
          del cliente en cada etapa del servicio.
        </p>
      </div>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---
const QuienesSomos = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      {" "}
      {/* Añadimos padding superior para el fixed header de Home */}
      <QuienesSomosSection />
      <MisionVisionSection />
      <ValoresClaveSection />
      {/* El componente "Directora" se elimina o se reemplaza por Equipo si es necesario */}
      {/* Llamada a la acción para el contacto, similar al archivo original */}
      <div className="text-center py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¿Listo para un proyecto?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Conoce cómo nuestra experiencia puede impulsar tu empresa.
        </p>
        <button
          onClick={() => navigate("/#contacto")} // Redirige al contacto en la Home
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Contactar a Ingeniería
        </button>
      </div>
    </div>
  );
};

export default QuienesSomos;
