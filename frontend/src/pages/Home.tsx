import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
// 💡 CORRECCIÓN: Unificación de todos los iconos de lucide-react
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
  Users,
  ChevronRight,
  MessageCircle, // Para el paso 1
  FileCheck,     // Para el paso 2
  ArrowRight,     // 💡 NUEVO: Para la flecha de la nueva sección de servicios
  TicketPercent
} from "lucide-react";

// Asegúrate de que esta ruta sea correcta en tu proyecto
import Fondo3 from "../assets/2.png";
import WhatsappFloat from "../components/WhatsappFloat";
import Yo from "../assets/Yo.png";

// --- 1. CONSTANTES ---
const PHONE_NUMBER = "+56 9 1234 5678";
const EMAIL = "servicioselectricos@innovolt.cl";
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

const ProductsSection = () => (
  <section id="productos" className="py-16 md:py-24 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Soluciones que he probado y recomiendo
      </h2>
      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
        No te compliques comprando componentes sueltos. He seleccionado estos 
        paquetes basándome en la calidad, durabilidad y lo que realmente 
        necesitan los hogares y pymes en Chile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CategoriasDeVenta.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              CALIDAD CERTIFICADA
            </div>

            <div className={`p-4 rounded-full bg-gray-50 mb-6`}>
                <item.icon className={`h-10 w-10 ${item.color}`} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {item.title}
            </h3>

            <ul className="text-left text-gray-600 space-y-3 mb-8 w-full px-4">
              {item.details.map((detail, i) => (
                <li key={i} className="flex items-start text-sm">
                  <div className="min-w-[20px] text-green-500 font-bold mr-2">✓</div>
                  {detail}
                </li>
              ))}
            </ul>

            <Link
              to={item.link}
              className="mt-auto w-full block bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-lg transition-all text-center"
            >
              {item.buttonLabel}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-12 text-gray-500 text-sm italic">
        * Todos los equipos cuentan con mi respaldo técnico y garantía directa.
      </p>
    </div>
  </section>
);

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
          <Link to="/quienes-somos" className="text-gray-600 hover:text-blue-600 transition-colors">
            Nosotros
          </Link>
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
  <section className="pt-24 pb-12 md:pt-32 md:pb-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div className="text-left z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            Electricista Certificado SEC
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
  Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x"><br></br>Esteban Valdés</span>.
</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ayudo a familias y pymes a tener instalaciones eléctricas 
            seguras, eficientes y sin complicaciones técnicas.
            <br />
            <strong>¿Tienes un proyecto o una urgencia? Hablemos.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hablar por WhatsApp
            </a>
            <a
              href="servicios/electricas" // Apunta a la nueva sección de servicios
              className="inline-flex items-center justify-center bg-gray-100 text-gray-800 hover:bg-gray-200 text-lg font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Ver mis servicios
            </a>
          </div>
        </div>

       {/* Foto */}
<div className="relative">
    {/* Fondo decorativo */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
    
    {/* Marco de la Foto */}
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
        {/* 👇 AQUÍ ESTÁ EL CAMBIO: La imagen real */}
        <img 
            src={Yo} 
            alt="Ingeniero Especialista InnoVolt" 
            className="w-full h-[500px] object-cover object-top" 
        />
    </div>

    {/* Tarjeta Flotante (Experiencia) */}
    <div className="absolute bottom-8 left-[-20px] bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 animate-bounce-slow">
        <div className="bg-green-100 p-2 rounded-full">
            <Zap className="text-green-600 w-6 h-6" />
        </div>
        <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Experiencia</p>
            <p className="text-lg font-bold text-gray-800">+2 Años en Terreno</p>
        </div>
    </div>
</div>
      </div>
    </div>
  </section>
);

const AboutMeSection = () => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Más que una empresa, soy tu aliado técnico
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        A diferencia de las grandes empresas donde nunca sabes quién vendrá a tu casa, 
        en <strong>InnoVolt</strong> yo superviso personalmente cada proyecto. 
        Mi objetivo es simple: desmitificar la electricidad y entregarte soluciones 
        que funcionen a la primera, cumpliendo con toda la normativa chilena vigente.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-blue-600 mb-1">SEC</div>
            <div className="text-sm text-gray-600">Certificado Clase D</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-blue-600 mb-1">24h</div>
            <div className="text-sm text-gray-600">Respuesta Rápida</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-blue-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Garantía Técnica</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-blue-600 mb-1">+130</div>
            <div className="text-sm text-gray-600">Clientes Felices</div>
        </div>
      </div>
    </div>
  </section>
);

// 💡 NUEVA SECCIÓN: GRILLA DE SERVICIOS DISPONIBLES
const ServicesGridSection = () => {
  const services = [
    {
      id: "electricas",
      title: "Electricista Autorizado SEC",
      description: "Certificaciones T1, aumentos de capacidad, urgencias y proyectos domiciliarios.",
      icon: Zap,
      color: "bg-blue-100 text-blue-600",
      link: "/servicios/electricas", // Lleva a la página que creamos
      highlight: true, 
    },
    {
      id: "fotovoltaicas",
      title: "Energía Solar (Kits)",
      description: "Instalación de paneles solares On-Grid y Off-Grid para reducir tu cuenta de luz.",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600",
      link: "/servicios/fotovoltaicas",
      highlight: false,
    },
    {
      id: "electromecanicas",
      title: "Electromecánica Vehicular",
      description: "Diagnóstico electrónico avanzado y reparación de sistemas vehiculares.",
      icon: Car,
      color: "bg-purple-100 text-purple-600",
      link: "/servicios/electromecanicas",
      highlight: false,
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
            Catálogo de Servicios
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            Servicios Disponibles
          </h2>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Selecciona el área en la que necesitas ayuda hoy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              to={service.link} 
              key={index}
              className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl flex flex-col items-start
                ${service.highlight 
                  ? 'border-blue-200 bg-blue-50/50 hover:border-blue-500' 
                  : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-auto flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Ver servicios
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
const ProcessSection = () => (
  <section id="proceso" className="py-20 bg-gray-50 relative">
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

        {/* Botón Atajo */}
        <a 
          href="#servicios"
          className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-gray-300 text-gray-600 text-sm font-bold hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all"
        >
          Prefiero ver los Servicios Disponibles <ArrowRight size={16} className="ml-2" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-200 -z-10"></div>

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
            className="mt-4 text-blue-600 font-semibold hover:text-blue-800 flex items-center"
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

      <div className="mt-20 text-center relative z-10">
        
        {/* 🔥 EL GANCHO DE LA TARJETA (NUEVO BLOQUE) 🔥 */}
        <div className="max-w-md mx-auto bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-8 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
           <div className="flex items-center justify-center text-yellow-800 font-extrabold text-lg mb-1">
              <TicketPercent className="w-6 h-6 mr-2 animate-bounce" />
              <span>¡No botes la tarjeta! Vale dinero.</span>
           </div>
           <p className="text-yellow-700 text-sm">
             Preséntala físicamente al momento de la visita y reclama un <span className="font-bold underline">descuento preferencial</span> en tu presupuesto final.
           </p>
        </div>

        <a
          href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-gray-900 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-gray-800 hover:scale-105 transition-all ring-4 ring-gray-200"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Tengo mi tarjeta, quiero canjear beneficio
        </a>
        <p className="mt-4 text-gray-500 text-sm font-medium">
           ¿Sin tarjeta? Escríbeme igual, tengo soluciones para todos.
        </p>
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
          <a href={`https://wa.me/${PHONE_NUMBER.replace(/\D/g,'')}`} className="flex items-center group cursor-pointer p-4 rounded-lg hover:bg-white/10 transition-colors">
            <div className="bg-green-500 p-3 rounded-full mr-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-lg">WhatsApp Directo</p>
              <p className="text-gray-400 text-sm">Respondo más rápido por aquí</p>
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
        <h3 className="text-2xl font-bold mb-2">Cuéntame sobre tu proyecto</h3>
        <p className="text-gray-500 mb-6 text-sm">Te responderé en menos de 24 horas hábiles.</p>
        <form className="space-y-4">
          <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tu Nombre" />
          <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Teléfono" />
          <textarea rows={4} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="¿En qué te puedo ayudar?"></textarea>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center transition-transform hover:-translate-y-1">
            <Send className="w-5 h-5 mr-2" /> Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-gray-700 pb-8">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-blue-500 flex items-center mb-3">
            <Zap className="w-6 h-6 mr-2" /> InnoVolt
          </Link>
          <p className="text-sm text-gray-400">Ingeniería para el futuro.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/quienes-somos" className="text-gray-400 hover:text-blue-500">Nosotros</Link></li>
            <li><a href="/#contacto" className="text-gray-400 hover:text-blue-500">Contacto</a></li>
            <li><Link to="/servicios/electricas" className="text-gray-400 hover:text-blue-500">Ver Servicios</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Especialidades</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/servicios/electricas" className="text-gray-400 hover:text-blue-500">Eléctricas</Link></li>
            <li><Link to="/servicios/fotovoltaicas" className="text-gray-400 hover:text-blue-500">Fotovoltaicas</Link></li>
            <li><Link to="/servicios/electromecanicas" className="text-gray-400 hover:text-blue-500">Electromecánicas</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Social</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-gray-400 hover:text-blue-500" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} InnoVolt Ingeniería.
      </div>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL (HOME) ---
const Home = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        
        {/* 👇 AQUÍ ESTÁ LA NUEVA SECCIÓN DE SERVICIOS */}
        
        <ProcessSection />
        <ProductsSection />
        <AboutMeSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Home;