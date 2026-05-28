import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, ShoppingCart, 
  Layout, CheckCircle, Smartphone, Globe, ExternalLink 
} from "lucide-react";

const PortfolioPage = () => {
  
  // 💡 TUS PROYECTOS Y PLANTILLAS
  const templates = [
    {
      id: 1,
      // 🔥 CASO DE ÉXITO REAL
      title: "Encuentro de Sanación", 
      category: "Caso de Éxito / Seccion de Agendamiento",
      desc: "Plataforma Corporativa completa en producción. Permite a los usuarios reservar terapias, gestionar horarios y realizar pagos. Un ejemplo real de mi capacidad técnica.",
      features: ["Agendamiento en Tiempo Real", "Catálogo de Terapias", "Integración de Pagos", "Diseño Responsive"],
      icon: Calendar,
      color: "text-purple-400",
      bg: "bg-purple-900/20 border-purple-500/30", // Un poco más destacado
      // 👇 Aquí conectamos tu sitio real
      demoLink: "https://www.encuentrodesanacion.com/encuentrofacil/", 
      isRealProject: true // Flag para cambiar el texto del botón
    },
    {
      id: 2,
      title: "E-commerce Industrial",
      category: "Plantilla Tienda Online",
      desc: "Tienda optimizada para venta de productos físicos con control de stock. Ideal para ferreterías, repuestos o insumos.",
      features: ["Carrito de Compras", "Pasarela WebPay/Stripe", "Gestión de Inventario", "Facturación Automática"],
      icon: ShoppingCart,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      demoLink: "https://ecommercepage-kappa.vercel.app/",
      isRealProject: false
    },
    {
      id: 3,
      title: "Landing Page Corporativa",
      category: "Plantilla Marketing",
      desc: "Sitios web de una sola página (One-Page) diseñados para capturar clientes (Leads) rápidamente para servicios específicos.",
      features: ["Diseño de Alto Impacto", "Formularios de Contacto", "Carga en < 1 seg", "Animaciones Scroll"],
      icon: Layout,
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      demoLink: "#",
      isRealProject: false
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navbar Fixed */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-white/5 bg-slate-950/90 backdrop-blur-md flex justify-between items-center">
        <Link to="/digital" className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Volver al Inicio Digital
        </Link>
        <span className="font-bold text-white tracking-widest text-lg hidden sm:block">
            PORTAFOLIO <span className="text-blue-500">_DEV</span>
        </span>
        <div className="w-20"></div> 
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-wider text-sm uppercase mb-2 block">
            Experiencia Comprobable
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Proyectos y Soluciones
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Desde sistemas complejos en funcionamiento hasta plantillas listas para adaptar. 
            Revisa la calidad de mi código en acción.
          </p>
        </div>

        {/* Grilla de Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {templates.map((item) => (
            <div key={item.id} className={`rounded-3xl border p-8 hover:border-opacity-50 transition-all duration-300 hover:-translate-y-2 group flex flex-col ${item.bg}`}>
              
              {/* Icono Principal */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-900 border border-slate-800 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={32} className={item.color} />
              </div>

              {/* Títulos */}
              <div className="flex justify-between items-start">
                <span className={`text-xs font-bold uppercase tracking-wider ${item.color}`}>
                    {item.category}
                </span>
                {item.isRealProject && (
                    <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/30">
                        ONLINE
                    </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                {item.title}
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
                {item.desc}
              </p>

              {/* Lista de Features */}
              <div className="bg-slate-900/50 rounded-xl p-5 mb-8 border border-white/5">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <Smartphone size={16} className="mr-2 text-slate-500"/> Funcionalidades:
                </h4>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-400">
                      <CheckCircle size={14} className={`mr-2 mt-1 ${item.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 mt-auto">
                {/* Botón 1: Ver el sitio (o demo) */}
                <a 
                  href={item.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-3 px-4 rounded-xl border font-semibold transition-colors flex items-center justify-center gap-2 text-sm
                    ${item.isRealProject 
                        ? 'border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <Globe size={16} /> {item.isRealProject ? "Visitar Web Real" : "Ver Demo"}
                </a>
                
                {/* Botón 2: Cotizar esto */}
                <a 
                  href={`https://wa.me/56923680476?text=Hola,%20vi%20el%20proyecto%20*${encodeURIComponent(item.title)}*%20y%20me%20gustaría%20algo%20similar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  Quiero algo así
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-20 text-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-12 border border-slate-800">
          <h2 className="text-3xl font-bold text-white mb-4">¿Tienes una idea distinta?</h2>
          <p className="text-slate-400 mb-8">
            Si tu proyecto no encaja en estas categorías, conversemos. 
            Puedo crear soluciones 100% a la medida de tu negocio.
          </p>
          <a 
            href="https://wa.me/56923680476"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/20"
          >
            Cotizar Desarrollo a Medida
          </a>
        </div>

      </div>
    </div>
  );
};

export default PortfolioPage;