import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Zap,
  CheckCircle,
  Mail,
  Phone,
  User,
  HelpCircle,
  ShieldCheck, // Icono para seguridad/normativa
  FileText,    // Icono para trámites/planos
  Home,        // Icono para residencial
  Factory,     // Icono para industrial
  AlertTriangle,
  ChevronRight, // Icono para urgencias
} from "lucide-react";

// --- DATOS DE SERVICIOS (Menú de Soluciones) ---
const serviciosDestacados = [
  {
    icon: FileText,
    title: "Trámites y Certificación TE1",
    desc: "Regulariza tu propiedad ante la SEC para venta, arriendo o patentes comerciales. Me encargo de todo el papeleo.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: AlertTriangle,
    title: "Urgencias y Fallas",
    desc: "¿Se corta la luz al encender el horno? ¿Olor a quemado? Diagnóstico y reparación rápida de cortocircuitos.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: ShieldCheck,
    title: "Tableros Normativos",
    desc: "Actualización de tableros antiguos peligrosos. Instalación de diferenciales para proteger a tu familia de golpes eléctricos.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Home,
    title: "Proyectos Residenciales",
    desc: "Instalación completa para casas nuevas, ampliaciones, recableado y automatización (domótica básica).",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Factory,
    title: "Aumento de Capacidad",
    desc: "Gestión de empalmes y aumento de potencia con la compañía eléctrica si tu medidor actual no da abasto.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Iluminación Eficiente",
    desc: "Diseño e instalación de iluminación LED interior y exterior para bajar el consumo y mejorar la estética.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const ElectricasPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. HEADER: PROPUESTA DE VALOR CLARA */}
      <header className="bg-slate-900 text-white py-16 relative overflow-hidden">
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center bg-blue-600/20 border border-blue-500/30 text-blue-300 py-1 px-3 rounded-full text-sm font-bold mb-6">
            <ShieldCheck size={14} className="mr-2"/> Instalador Autorizado SEC
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Soluciones Eléctricas <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Seguras y Certificadas
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed mx-auto md:mx-0">
            Desde un simple enchufe hasta la certificación completa de tu hogar. 
            Trabajo bajo normativa vigente para garantizar tu seguridad y la de tu inversión.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
             <a
              href="https://wa.me/56912345678" // ⚠️ TU NÚMERO AQUÍ
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 transition-all shadow-lg shadow-green-900/20"
            >
              <Phone className="w-5 h-5 mr-2" />
              Cotizar por WhatsApp
            </a>
            <button
               onClick={() => {
                 const element = document.getElementById('servicios-lista');
                 element?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border border-gray-600 rounded-lg hover:bg-white/10 transition-colors"
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. COLUMNA IZQUIERDA: GRILLA DE SERVICIOS (EL MENÚ) */}
        <div className="lg:col-span-8" id="servicios-lista">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">
            ¿Qué necesitas resolver hoy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviciosDestacados.map((servicio, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 ${servicio.bg} ${servicio.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <servicio.icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {servicio.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow">
                  {servicio.desc}
                </p>

                {/* Enlace sutil de acción */}
                <a 
                   href={`https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20servicio%20de%20*${encodeURIComponent(servicio.title)}*`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 mt-auto"
                >
                  Consultar por esto <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>

          {/* Banner de Garantía */}
          <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
             <div className="bg-white p-4 rounded-full shadow-sm text-yellow-500">
                <CheckCircle size={32} />
             </div>
             <div className="text-center md:text-left">
                <h4 className="text-lg font-bold text-gray-900">Trabajo Garantizado</h4>
                <p className="text-gray-600">
                 Electricista certificado. 
                  Todos mis trabajos incluyen garantía post-venta y cumplimiento de la norma NCH 4/2003.
                </p>
             </div>
          </div>
        </div>

        {/* 3. COLUMNA DERECHA: CONTACTO PERSONAL (STICKY) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-blue-100 relative overflow-hidden">
               {/* Efecto decorativo */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>

               <div className="flex items-center mb-6">
                 <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
                    {/* 👇 AQUÍ VA TU FOTO REAL */}
                    {/* <img src={TuFoto} className="w-full h-full object-cover" /> */}
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <User size={32} />
                    </div>
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Ingeniero a cargo</p>
                   <h3 className="text-xl font-bold text-gray-900 leading-tight">Tu Nombre</h3>
                 </div>
               </div>

               <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                 "Mi compromiso es entregarte una solución definitiva, no un parche temporal. Cuéntame tu problema y lo resolvemos."
               </p>

               <div className="space-y-4">
                 <a
                  href="https://wa.me/56912345678" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-4 font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl shadow-lg hover:shadow-green-200/50 transition-all transform hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Hablemos por WhatsApp
                </a>

                <a
                  href="mailto:contacto@innovolt.cl"
                  className="w-full flex items-center justify-center px-4 py-4 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Enviar Correo
                </a>
               </div>

               <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
                  <HelpCircle size={14} className="mr-1"/> Respondo personalmente
               </div>
            </div>

            {/* Navegación Rápida Lateral */}
            <div className="mt-8 pl-4 border-l-2 border-gray-200">
               <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Otros Departamentos</h4>
               <ul className="space-y-3 text-sm">
                 <li>
                   <Link to="/servicios/fotovoltaicas" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span> Energía Solar
                   </Link>
                 </li>
                 <li>
                   <Link to="/servicios/electromecanicas" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                     <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span> Electromecánica
                   </Link>
                 </li>
               </ul>
            </div>
          </div>
        </aside>

      </div>

      {/* FOOTER SIMPLE */}
      <div className="py-12 bg-gray-50 border-t border-gray-200 text-center">
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center justify-center mx-auto transition-colors"
        >
          ← Volver al Inicio
        </button>
      </div>

    </div>
  );
};

export default ElectricasPage;