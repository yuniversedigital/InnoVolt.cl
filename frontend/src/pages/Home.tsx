import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Car,
  Instagram,
  Facebook,
  Zap,
  Sun,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronRight,
  MessageCircle, 
  FileCheck,     
  ArrowRight,    
  TicketPercent
} from "lucide-react";

// Asegúrate de que esta ruta sea correcta en tu proyecto
import Fondo3 from "../assets/2.png"; // Si no lo usas, puedes eliminar la importación
import Yo from "../assets/yo2.png";
// import WhatsappFloat from "../components/WhatsappFloat";

// --- 1. CONSTANTES ---
const PHONE_NUMBER = "+56 9 2368 0476";
const EMAIL = "ventas.innovolt@gmail.com";
const ADDRESS = "Santiago, Región Metropolitana, Chile";

// --- DATOS PARA SECCIÓN DE PRODUCTOS/KITS ---
const CategoriasDeVenta = [
  {
    title: "Servicios de Ingeniería",
    icon: Wrench,
    color: "text-blue-600",
    details: [
      "Auditorías y Certificación SEC (TE1).",
      "Diseño e instalación de sistemas de media y baja tensión.",
      "Mantenimiento predictivo y correctivo.",
    ],
    link: "/catalogo#servicios-section",
    buttonLabel: "Ver Servicios",
  },
  {
    title: "Kits Fotovoltaicos",
    icon: Sun,
    color: "text-yellow-600",
    details: [
      "Kits On-Grid (Inyección a la red) residenciales.",
      "Kits Off-Grid (Aislados) para zonas rurales.",
      "Sistemas de respaldo de baterías.",
    ],
    link: "/catalogo#kits-section",
    buttonLabel: "Ver Kits",
  },
  {
    title: "Venta de Componentes",
    icon: Zap,
    color: "text-red-600",
    details: [
      "Paneles Solares (Bifaciales, Monocristalinos).",
      "Inversores de Corriente (Onda Pura, Híbridos).",
      "Baterías de Almacenamiento (Litio, AGM).",
      "Motores de Partida",
      "Alternadores",
    ],
    link: "/catalogo",
    buttonLabel: "Ir al Catálogo",
  },
];

// --- SECCIONES INDIVIDUALES ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed w-full top-0 left-0 bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold text-blue-600 flex items-center">
          <Zap className="w-8 h-8 mr-2" />
          InnoVolt
        </Link>

        <nav className="hidden md:flex space-x-8 items-center text-lg font-medium">
          <Link to="/servicios/electricas" className="text-gray-600 hover:text-blue-600 transition-colors">
            Servicios
          </Link>
          <a href="/#contacto" onClick={handleScrollToContact} className="text-gray-600 hover:text-blue-600 transition-colors">
            Contacto
          </a>
        </nav>

        <div className="hidden md:block w-32"></div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-800 hover:text-blue-600 transition-colors">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Móvil */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="flex flex-col space-y-2 px-4 text-center">
          <Link to="/quienes-somos" onClick={() => setIsOpen(false)} className="py-2 text-gray-800 hover:bg-gray-100 rounded">Nosotros</Link>
          <Link to="/servicios/electricas" onClick={() => setIsOpen(false)} className="py-2 text-gray-800 hover:bg-gray-100 rounded">Servicios</Link>
          <a href="/#contacto" onClick={(e) => { setIsOpen(false); handleScrollToContact(e); }} className="py-2 text-gray-800 hover:bg-gray-100 rounded">Contacto</a>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="pt-28 pb-12 md:pt-36 md:pb-24 bg-white overflow-hidden relative">
    {/* Patrón de fondo para dar textura tecnológica */}
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto Orientado a Conversión */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-200 mb-6 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            Electricista Autorizado SEC
          </div>
          
          <h1 className="text-5xl md:text-6xl md:leading-[1.1] font-extrabold mb-6 text-gray-900 tracking-tight">
            Soluciones eléctricas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">no fallan.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
            Soy Esteban Valdés. Ayudo a familias y pymes a tener instalaciones seguras, certificadas y sin dolores de cabeza. ¿Tienes una urgencia o un proyecto?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            {/* 🔥 BOTÓN DE ALTO IMPACTO PRINCIPAL 🔥 */}
            <Link
              to="/servicios/electricas"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-extrabold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] ring-4 ring-blue-500/20 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-300 group-hover:animate-pulse" />
                VER SERVICIOS ELÉCTRICOS
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            {/* BOTÓN SECUNDARIO (WhatsApp) */}
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-green-500 hover:text-green-600 text-lg font-bold px-6 py-4 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5 mr-2 text-green-500" />
              Tengo una duda rápida
            </a>
          </div>
          
          {/* Prueba Social Rápida */}
          <div className="mt-8 flex items-center gap-4 text-sm font-semibold text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">⭐</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">⭐</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">⭐</div>
            </div>
            <p>+130 proyectos entregados con éxito en Chile.</p>
          </div>
        </div>

        {/* Foto */}
        <div className="relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                    src={Yo} 
                    alt="Esteban Valdés - Ingeniero Especialista InnoVolt" 
                    className="w-full h-[550px] object-cover object-top" 
                />
            </div>

            <div className="absolute bottom-8 left-[-20px] bg-white p-4 rounded-xl shadow-2xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-100 p-3 rounded-full">
                    <FileCheck className="text-green-600 w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Normativa Vigente</p>
                    <p className="text-lg font-extrabold text-gray-900">100% Certificado</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

// 💡 SECCIÓN DE SERVICIOS DISPONIBLES
const ServicesGridSection = () => {
  const services = [
    {
      id: "electricas",
      title: "Electricista Autorizado SEC",
      description: "Certificaciones TE1, aumentos de capacidad, urgencias y proyectos domiciliarios integrales.",
      icon: Zap,
      color: "bg-blue-100 text-blue-600",
      link: "/servicios/electricas", 
      highlight: true, 
    },
    {
      id: "fotovoltaicas",
      title: "Energía Solar (Kits)",
      description: "Instalación de paneles solares On-Grid y Off-Grid para reducir tu cuenta de luz al máximo.",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600",
      link: "/servicios/fotovoltaicas",
      highlight: false,
    },
    {
      id: "electromecanicas",
      title: "Electromecánica Vehicular",
      description: "Diagnóstico electrónico avanzado, escáner y reparación de sistemas vehiculares complejos.",
      icon: Car,
      color: "bg-purple-100 text-purple-600",
      link: "/servicios/electromecanicas",
      highlight: false,
    },
  ];

  return (
    <section id="servicios" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
            Especialidades InnoVolt
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            ¿En qué te puedo ayudar hoy?
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Elige el área de tu proyecto para ver detalles, precios referenciales y metodología de trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              to={service.link} 
              key={index}
              className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl flex flex-col items-start
                ${service.highlight 
                  ? 'border-blue-300 bg-white ring-4 ring-blue-50 hover:border-blue-500 scale-105 z-10' 
                  : 'border-gray-200 bg-white hover:border-gray-300 mt-4 md:mt-0'
                }`}
            >
              {service.highlight && (
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-md">
                   Más Solicitado
                 </div>
              )}

              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm ${service.color}`}>
                <service.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className={`mt-auto flex items-center text-sm font-bold transition-colors ${service.highlight ? 'text-blue-600 group-hover:text-blue-800' : 'text-gray-900 group-hover:text-blue-600'}`}>
                Ver detalles del servicio
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => (
  <section id="proceso" className="py-20 bg-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-16">
        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
          Comencemos Ya.
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
          ¿Cómo trabajaremos juntos?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Olvida los formularios largos. Accede directo a una solución rápida en 3 pasos:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-100 -z-10"></div>

        {/* PASO 1 */}
        <div className="relative flex flex-col items-center text-center group">
          <div className="w-24 h-24 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
            <MessageCircle className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">1. Envíame una Foto</h3>
          <p className="text-gray-600 leading-relaxed px-4">
            Escríbeme al WhatsApp y mándame una foto de tu tablero, enchufe o el lugar del proyecto.
          </p>
          <a 
            href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-600 font-bold hover:text-blue-800 flex items-center bg-blue-50 px-4 py-2 rounded-full transition-colors"
          >
            Enviar WhatsApp ahora <span className="ml-1">→</span>
          </a>
        </div>

        {/* PASO 2 */}
        <div className="relative flex flex-col items-center text-center group">
          <div className="w-24 h-24 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
            <FileCheck className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">2. Recibe tu Presupuesto</h3>
          <p className="text-gray-600 leading-relaxed px-4">
            Te daré un valor cerrado o agendaremos una visita técnica si es complejo. Sin sorpresas.
          </p>
        </div>

        {/* PASO 3 */}
        <div className="relative flex flex-col items-center text-center group">
          <div className="w-24 h-24 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
            <Zap className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">3. Solución Certificada</h3>
          <p className="text-gray-600 leading-relaxed px-4">
            Realizo el trabajo bajo normativa SEC. Dejo todo limpio, ordenado y con garantía.
          </p>
        </div>
      </div>

      <div className="mt-24 text-center relative z-10 bg-gray-50 p-8 rounded-3xl border border-gray-200">
        <div className="max-w-md mx-auto bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-8 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
           <div className="flex items-center justify-center text-yellow-800 font-extrabold text-lg mb-1">
              <TicketPercent className="w-6 h-6 mr-2 animate-bounce" />
              <span>¡No botes mi tarjeta! Vale dinero.</span>
           </div>
           <p className="text-yellow-800 text-sm font-medium">
             Preséntala físicamente al momento de la visita y reclama un <span className="font-extrabold underline">descuento preferencial</span> en tu presupuesto final.
           </p>
        </div>

        <a
          href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:bg-gray-800 hover:scale-105 transition-all ring-4 ring-gray-200"
        >
          <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
          Tengo mi tarjeta, quiero canjear beneficio
        </a>
      </div>

    </div>
  </section>
);

const AboutMeSection = () => (
  <section className="py-16 bg-blue-600 border-b border-blue-700 text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Más que una empresa, soy tu aliado técnico
      </h2>
      <p className="text-lg text-blue-100 leading-relaxed mb-10">
        A diferencia de las grandes empresas donde nunca sabes quién vendrá a tu casa, 
        en <strong>InnoVolt</strong> superviso personalmente cada proyecto. 
        Mi objetivo es simple: desmitificar la electricidad y entregarte soluciones 
        que funcionen a la primera, cumpliendo con toda la normativa chilena vigente.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-700 rounded-xl shadow-inner border border-blue-500">
            <div className="font-extrabold text-3xl text-white mb-1">SEC</div>
            <div className="text-sm text-blue-200 font-medium">Certificado Clase D</div>
        </div>
        <div className="p-4 bg-blue-700 rounded-xl shadow-inner border border-blue-500">
            <div className="font-extrabold text-3xl text-white mb-1">24h</div>
            <div className="text-sm text-blue-200 font-medium">Respuesta Rápida</div>
        </div>
        <div className="p-4 bg-blue-700 rounded-xl shadow-inner border border-blue-500">
            <div className="font-extrabold text-3xl text-white mb-1">100%</div>
            <div className="text-sm text-blue-200 font-medium">Garantía Técnica</div>
        </div>
        <div className="p-4 bg-blue-700 rounded-xl shadow-inner border border-blue-500">
            <div className="font-extrabold text-3xl text-white mb-1">+130</div>
            <div className="text-sm text-blue-200 font-medium">Clientes Felices</div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contacto" className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
      <div>
        <h2 className="text-4xl font-bold mb-6">
          ¿Tienes dudas técnicas? <br/>
          <span className="text-blue-400">Hablemos directamente.</span>
        </h2>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Sin call centers. Entiendo que cuando hay un problema eléctrico, necesitas respuestas rápidas.
          <br /><br />
          <strong>Escríbeme y yo mismo revisaré tu caso.</strong>
        </p>

        <div className="space-y-6">
          <a href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`} className="flex items-center group cursor-pointer p-4 rounded-xl border border-gray-700 hover:border-green-500 hover:bg-white/5 transition-all">
            <div className="bg-green-500 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/30">
                <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">WhatsApp Directo</p>
              <p className="text-gray-400 text-sm group-hover:text-gray-300">Respondo al instante por aquí</p>
            </div>
          </a>

          <div className="flex items-center p-4">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Correo Electrónico</p>
              <p className="text-gray-400 text-sm">{EMAIL}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4">
            <div className="bg-gray-700 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">Zona de Cobertura</p>
              <p className="text-gray-400 text-sm">Todo el Litoral Central</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
        <h3 className="text-2xl font-extrabold mb-2 text-gray-900">Cuéntame sobre tu proyecto</h3>
        <p className="text-gray-500 mb-6 text-sm">Te responderé en menos de 24 horas hábiles.</p>
        <form className="space-y-4">
          <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Tu Nombre" />
          <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Teléfono" />
          <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="¿En qué te puedo ayudar?"></textarea>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center transition-transform hover:-translate-y-1">
            <Send className="w-5 h-5 mr-2" /> Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-950 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-blue-500 flex items-center mb-3">
            <Zap className="w-6 h-6 mr-2" /> InnoVolt
          </Link>
          <p className="text-sm text-gray-500">Ingeniería para el futuro.</p>
        </div>
        {/* <div>
          <h4 className="text-lg font-bold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><Link to="/quienes-somos" className="text-gray-400 hover:text-blue-500">Nosotros</Link></li>
            <li><a href="/#contacto" className="text-gray-400 hover:text-blue-500">Contacto</a></li>
            <li><Link to="/servicios/electricas" className="text-gray-400 hover:text-blue-500">Ver Servicios</Link></li>
          </ul>
        </div> */}
        <div>
          <h4 className="text-lg font-bold mb-3">Especialidades</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><Link to="/servicios/electricas" className="text-gray-400 hover:text-blue-500">Eléctricas</Link></li>
            {/* <li><Link to="/servicios/fotovoltaicas" className="text-gray-400 hover:text-blue-500">Fotovoltaicas</Link></li>
            <li><Link to="/servicios/electromecanicas" className="text-gray-400 hover:text-blue-500">Electromecánicas</Link></li> */}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-3">Social</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex space-x-4">
              <a href="https://instagram.com/innovolt.cl" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"><Instagram className="w-5 h-5 text-white" /></a>
              <a href="https://facebook.com/innovolt" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors"><Facebook className="w-5 h-5 text-white" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-2 text-sm font-medium text-gray-600">
        © {new Date().getFullYear()} InnoVolt Ingeniería. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL (HOME) ---
const Home = () => {
  return (
    <div className="bg-white selection:bg-blue-200 selection:text-blue-900">
      <Header />
      <main>
        <HeroSection />
        {/* <ServicesGridSection /> */}
        <ProcessSection />
        <AboutMeSection />
        <ContactSection />
      </main>
      <Footer />
      {/* <WhatsappFloat /> */}
    </div>
  );
};

export default Home;