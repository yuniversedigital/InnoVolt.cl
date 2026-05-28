import React from "react";
import { Link } from "react-router-dom";
import { 
  Code, Database, Globe, ArrowLeft, Send, Terminal 
} from "lucide-react";

const DigitalHome = () => {
  const techStack = ["React", "Node.js", "Tailwind", "Python", "AWS", "PostgreSQL"];

  const services = [
    {
      title: "Desarrollo Full Stack",
      desc: "Aplicaciones web completas, rápidas y escalables a medida de tu negocio.",
      icon: Code,
      color: "text-blue-400"
    },
    {
      title: "Software SaaS",
      desc: "Transformo tu idea en un producto de software como servicio listo para vender.",
      icon: Database,
      color: "text-purple-400"
    },
    {
      title: "Landing Pages de Alto Impacto",
      desc: "Webs optimizadas para convertir visitas en clientes (como esta).",
      icon: Globe,
      color: "text-green-400"
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white font-sans">
      
      {/* 🚀 HEADER FIXED CON BLUR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-white/5 bg-slate-950/80 backdrop-blur-md flex justify-between items-center transition-all">
        {/* Izquierda: Volver al Hub */}
        <Link to="/" className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Volver al Hub
        </Link>

        {/* Centro: Logo Dev */}
        <span className="font-bold text-white tracking-widest text-lg hidden md:block">
            INNOVOLT <span className="text-blue-500">_DEV</span>
        </span>

        {/* Derecha: Navegación */}
        <div className="flex items-center gap-6">
            {/* 💡 ENLACE A TU NUEVA PÁGINA DE PORTAFOLIO */}
            <Link 
                to="/portafolio" 
                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
            >
                Ver Demos / Portafolio
            </Link>
            <a 
                href="https://wa.me/56923680476" 
                className="px-5 py-2 text-sm font-bold text-slate-950 bg-white rounded-full hover:bg-blue-50 transition-colors"
            >
                Hablemos
            </a>
        </div>
      </nav>

      {/* Espaciador para el header fixed */}
      <div className="h-20"></div>

      {/* Hero Digital */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 border border-blue-500/20 animate-fade-in">
          DESARROLLADOR FULL STACK & CREATIVO
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Construyo Software que <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
            Impulsa Negocios
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          No soy solo código. Soy un ingeniero que entiende de procesos reales. 
          Llevo la eficiencia de la ingeniería al mundo del software.
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-3 opacity-80">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-slate-900/50 rounded border border-slate-700 text-xs font-mono text-slate-300 flex items-center">
              <Terminal size={12} className="mr-2 text-blue-500"/> {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((srv, index) => (
              <div key={index} className="p-8 bg-slate-950 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 group">
                <srv.icon size={40} className={`mb-6 ${srv.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
                <p className="text-slate-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            ¿Tienes una idea de Software?
          </h2>
          <p className="text-blue-100 mb-8 text-lg relative z-10">
            Ya sea automatizar tu Pyme o lanzar tu propia Startup. 
            Tengo la capacidad técnica para construirlo.
          </p>
          <a 
            href="https://wa.me/56923680476"
            className="relative z-10 inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Send size={20} className="mr-2" /> Agendar Reunión Dev
          </a>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© {new Date().getFullYear()} InnoVolt Dev. Ingeniería aplicada al código.</p>
      </footer>
    </div>
  );
};

export default DigitalHome;