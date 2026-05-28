import React from "react";
import { Link } from "react-router-dom";
import { Zap, Code, ArrowRight, User } from "lucide-react";
// Importa tu foto aquí
import FotoYo from "../assets/Yo.png";

const LandingHub = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navbar Minimalista */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-slate-900 rounded flex items-center justify-center font-black">I</div>
          INNOVOLT
        </div>
        <a href="https://wa.me/56923680476" className="text-sm font-semibold hover:text-blue-400 transition-colors">
          Contacto Directo
        </a>
      </nav>

      {/* Contenedor Principal */}
      <div className="relative flex flex-col lg:flex-row h-screen">
        
        {/* LADO IZQUIERDO: ELÉCTRICO */}
        <div className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-700">
          <div className="absolute inset-0 bg-slate-900 transition-transform duration-700 group-hover:scale-105"></div>
          {/* Efecto de fondo sutil */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-10 text-center">
            <div className="mb-6 p-4 rounded-full bg-slate-800/50 group-hover:bg-yellow-500/20 transition-colors duration-500 ring-1 ring-white/10">
              <Zap size={48} className="text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 group-hover:text-yellow-400 transition-colors">
              Ingeniería Eléctrica
            </h2>
            <p className="text-slate-400 max-w-sm mb-8 text-lg">
              Certificación SEC, proyectos industriales, paneles solares y automatización física.
            </p>
            <Link 
              to="/electricidad" 
              className="group/btn flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 rounded-full hover:bg-yellow-500 hover:border-yellow-500 hover:text-slate-900 transition-all duration-300"
            >
              Soluciones Físicas <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CENTRO: TU FOTO (Nexo) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 shadow-2xl">
                    <img src={FotoYo} alt="Yo" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

        {/* LADO DERECHO: DIGITAL */}
        <div className="relative flex-1 group overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 transition-transform duration-700 group-hover:scale-105"></div>
          {/* Efecto de fondo sutil */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>

          <div className="relative z-10 h-full flex flex-col justify-center items-center p-10 text-center">
            <div className="mb-6 p-4 rounded-full bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors duration-500 ring-1 ring-white/10">
              <Code size={48} className="text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 group-hover:text-blue-400 transition-colors">
              Desarrollo Digital
            </h2>
            <p className="text-slate-400 max-w-sm mb-8 text-lg">
              Desarrollo Full Stack, Software a Medida (SaaS), Apps Web y transformación digital para Pymes.
            </p>
            <Link 
              to="/digital" 
              className="group/btn flex items-center gap-2 px-8 py-3 bg-transparent border border-white/20 rounded-full hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
            >
              Soluciones de Software <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
      
      {/* Footer Flotante */}
      <div className="absolute bottom-4 w-full text-center text-slate-500 text-xs">
        <p>Unificando el mundo físico y digital • InnoVolt Spa</p>
      </div>
    </div>
  );
};

export default LandingHub;