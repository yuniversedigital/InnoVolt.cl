import React, { useState, useRef, useEffect } from "react"; // 💡 CORRECCIÓN 1: Importar hooks de React desde 'react'
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Car,
  Instagram,
  Facebook,
  Zap, // Eléctricas
  Sun, // Fotovoltaicas
  Wrench, // Electromecánicas
  Phone,
  Mail,
  MapPin,
  Send,
  Target, // Misión
  TrendingUp, // Crecimiento
  Users, // Equipo
  ChevronRight, // Usado en ProcessSection
} from "lucide-react";
import ProductCard from "../components/ProductCard";
// Usar un nombre de archivo de fondo genérico o el que estés utilizando
import Fondo3 from "../assets/2.png";
import WhatsappFloat from "../components/WhatsappFloat";
// ELIMINADOS: CartIcon, Giftcard, ReservaHora, CarruselAlianzas, etc.

// --- 1. CONSTANTES DE INNOVOLT ---
const PHONE_NUMBER = "+56 9 1234 5678";
const EMAIL = "servicioselectricos@innovolt.cl";
const ADDRESS = "Santiago, Región Metropolitana, Chile";

// Datos para la Sección de Servicios Clave
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
const ProductsSection = () => (
  <section id="productos" className="py-16 md:py-24 bg-gray-100">
       {" "}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           {" "}
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
                NUESTRO CATÁLOGO     {" "}
      </h2>
           {" "}
      <p className="text-xl text-gray-600 mb-12">
                En InnoVolt encontrará desde la visita técnica de diagnóstico
        hasta la instalación de sistemas complejos.      {" "}
      </p>
                       {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {" "}
        {CategoriasDeVenta.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 flex flex-col items-center"
          >
                       {" "}
            <item.icon className={`h-12 w-12 ${item.color} mx-auto mb-4`} />   
                   {" "}
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            {item.title}           {" "}
            </h3>
                       {" "}
            <ul className="text-left text-gray-600 space-y-2 mb-6 w-full max-w-[250px]">
                           {" "}
              {item.details.map((detail, i) => (
                <li key={i} className="flex items-start text-sm">
                                   {" "}
                  <ChevronRight className="w-4 h-4 mr-2 mt-1 text-green-600 flex-shrink-0" />
                                    {detail}               {" "}
                </li>
              ))}
                         {" "}
            </ul>
                       {" "}
            {/* 💡 Mantener Link para dirigir al usuario, pero es solo un botón de navegación */}
                       {" "}
            <Link
              to={item.link} // Aquí va la ruta corregida: "/catalogo-general#servicios-section"
              className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
            >
              {item.buttonLabel}
            </Link>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
                       {" "}
      <p className="mt-12 text-gray-500 text-sm">
                Para una cotización detallada de componentes, acceda a nuestro
        catálogo y añada los productos al carrito de cotización.      {" "}
      </p>
         {" "}
    </div>
     {" "}
  </section>
);
const ServiciosInnoVolt = [
  {
    id: "electricas",
    title: "Soluciones Eléctricas",
    icon: Zap,
    description:
      "Diseño, ejecución y mantenimiento de instalaciones de baja y media tensión, asegurando cumplimiento normativo y eficiencia.",
  },
  {
    id: "fotovoltaicas",
    title: "Soluciones Fotovoltaicas",
    icon: Sun,
    description:
      "Implementación de sistemas solares 'On Grid' y 'Off Grid' para la generación de energía limpia, reduciendo costos operacionales.",
  },
  {
    id: "electromecanicas",
    // 💡 CAMBIO DE TÍTULO
    title: "Electromecánica Vehicular",
    // 💡 CAMBIO DE ICONO
    icon: Car,
    description:
      // 💡 CAMBIO DE DESCRIPCIÓN: Enfocamos el servicio en el sector automotriz.
      "Diagnóstico, reparación y mantenimiento de sistemas eléctricos, electrónicos y mecánicos en vehículos livianos y transporte.",
  },
];

// -------------------------------------------------------------------
// 2. DEFINICIÓN DE COMPONENTES DE SECCIÓN
// -------------------------------------------------------------------

// 2.1. Header / Navbar
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // 💡 useNavigate no se usa en este componente, pero lo mantenemos por si lo necesitas
  const navigate = useNavigate();

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
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600 flex items-center"
        >
          <Zap className="w-8 h-8 mr-2" />
          InnoVolt
        </Link>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex space-x-8 items-center text-lg font-medium">
          <Link
            to="/quienes-somos"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Nosotros
          </Link>
          <Link
            to="/servicios/electricas"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Servicios
          </Link>
          <a
            href="/#contacto"
            onClick={handleScrollToContact}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contacto
          </a>
        </nav>

        {/* 💡 NUEVO ESPACIADOR: Oculto en móvil (md:hidden), visible en desktop (md:block). 
        Esto mueve la navegación hacia la izquierda. */}
        <div className="hidden md:block w-32"></div>

        {/* Botón de Menú Móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 hover:text-blue-600 transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 py-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2 px-4 text-center">
          <Link
            to="/quienes-somos"
            onClick={() => setIsOpen(false)}
            className="py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            Nosotros
          </Link>
          <Link
            to="/servicios/electricas"
            onClick={() => setIsOpen(false)}
            className="py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            Servicios
          </Link>
          <a
            href="/#contacto"
            onClick={(e) => {
              setIsOpen(false);
              handleScrollToContact(e);
            }}
            className="py-2 text-gray-800 hover:bg-gray-100 rounded"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

// 2.2. Hero Section
const HeroSection = () => (
  <section
    className="pt-20 bg-cover bg-center min-h-screen flex items-center"
    style={{ backgroundImage: `url(${Fondo3})` }}
  >
    <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-24 text-center text-white">
      <h1 className="text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
        Ingeniería Eléctrica y Energía Renovable
      </h1>
      <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
        Soluciones innovadoras en baja tensión, media tensión, sistemas
        fotovoltaicos y electromecánica industrial.
      </p>
      <div className="space-x-4">
        <a // 💡 CAMBIADO DE <Link> A <a> PARA REDIRECCIÓN INTERNA (ANCHOR)
          href="#proceso" // 👈 Redirige directamente a la sección ProcessSection
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-xl transition-colors"
        >
                    Solicitud de Servicios     {" "}
        </a>
        <a
          href="#productos"
          className="inline-block bg-white text-gray-800 hover:bg-gray-200 text-lg font-semibold px-8 py-3 rounded-lg shadow-xl transition-colors"
        >
          Nuestro Catálogo
        </a>
      </div>
    </div>
  </section>
);

// 2.3. Key Services Section
const KeyServicesSection = () => (
  <section id="servicios" className="py-16 md:py-24 bg-gray-50">
       {" "}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           {" "}
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Nuestros Pilares de Ingeniería      {" "}
      </h2>
           {" "}
      <p className="text-xl text-gray-600 mb-12">
                Expertos en cada área para la eficiencia, seguridad y
        sostenibilidad de su proyecto.      {" "}
      </p>
           {" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {" "}
        {ServiciosInnoVolt.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-600"
          >
                       {" "}
            <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />   
                   {" "}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                            {service.title}           {" "}
            </h3>
                       {" "}
            <p className="text-gray-600 mb-5">{service.description}</p>         
                         {" "}
            <Link
              to={`/servicios/${service.id}`}
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center"
            >
                            Ver Detalles del Servicio              {" "}
              <span className="ml-1 text-lg">→</span>           {" "}
            </Link>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
               {" "}
    </div>
     {" "}
  </section>
);

// 2.4. Why Choose Us Section
// const WhyChooseUsSection = () => (
//   <section className="py-16 md:py-24 bg-white">
//        {" "}
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//            {" "}
//       <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
//                 ¿Por Qué Elegir InnoVolt?      {" "}
//       </h2>
//            {" "}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                {" "}
//         <div className="text-center p-6 border rounded-lg shadow-sm">
//                     <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//                  {" "}
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         Compromiso Normativo{" "}
//           </h3>
//                    {" "}
//           <p className="text-gray-600">
//                         Trabajamos bajo los más altos estándares de calidad y
//             seguridad, con certificación SEC/IEC, garantizando instalaciones
//             confiables.{" "}
//           </p>
//                  {" "}
//         </div>
//                {" "}
//         <div className="text-center p-6 border rounded-lg shadow-sm">
//                    {" "}
//           <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//            {" "}
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         Innovación y Eficiencia{" "}
//           </h3>
//                    {" "}
//           <p className="text-gray-600">
//             Implementamos tecnologías de vanguardia, desde automatización hasta
//             energías renovables, optimizando el consumo y la operatividad.
//               {" "}
//           </p>
//                  {" "}
//         </div>
//                {" "}
//         <div className="text-center p-6 border rounded-lg shadow-sm">
//                     <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//                  {" "}
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                         Soporte Integral{" "}
//           </h3>
//                    {" "}
//           <p className="text-gray-600">
//                         Ofrecemos asesoría completa, desde la fase de diseño
//             hasta el mantenimiento post-instalación, con un equipo de ingenieros
//             dedicados.
//           </p>
//                  {" "}
//         </div>
//              {" "}
//       </div>
//          {" "}
//     </div>
//      {" "}
//   </section>
// );

// 2.5. Process Section (Nueva sección para guiar al usuario)
const ProcessSection = () => (
  <section id="proceso" className="py-16 md:py-24 bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Visita Técnica en 3 Pasos
      </h2>

      {/* 1. Selección de Servicio */}
      <h3 className="text-2xl font-bold text-gray-700 text-center mb-6">
        1. Elige tu Área de Interés:
      </h3>

      {/* CONTENEDOR DE SELECCIÓN DE SERVICIO */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
        <Link
          to="/servicios/electricas"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors min-w-[200px]"
        >
          <Zap size={20} className="mr-2" />
          Soluciones Eléctricas
        </Link>

        <Link
          to="/servicios/fotovoltaicas"
          className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors min-w-[200px]"
        >
          <Sun size={20} className="mr-2" />
          Soluciones Fotovoltaicas
        </Link>

        <Link
          to="/servicios/electromecanicas"
          className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors min-w-[200px]"
        >
          <Car size={20} className="mr-2" />
          Electromecánica Vehicular
        </Link>
      </div>
      {/* FIN DEL SELECTOR */}

      {/* Separador visual */}
      <hr className="mb-12 border-gray-300" />

      {/* Pasos del 1 al 3 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center items-center">
        {/* Paso 1 (Texto) */}
        <div className="group p-4 transition-transform transform hover:scale-105 md:col-span-1">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-xl">
            1
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Agenda tu Visita
          </h3>
          <p className="text-gray-600 text-sm">
            Selecciona el servicio requerido Y Selecciona "Agendar Visita"
          </p>
        </div>

        {/* Flecha (Solo para desktop) */}
        <div className="hidden md:flex items-center justify-center text-blue-600">
          <ChevronRight size={32} />
        </div>

        {/* Paso 2 */}
        <div className="group p-4 transition-transform transform hover:scale-105 md:col-span-1">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-xl">
            2
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Rellena El Formulario
          </h3>
          <p className="text-gray-600 text-sm">
            Rellena el formulario con los datos solicitados. Dirígete al
            Carrito, procede al Pago y confirma la transacción
          </p>
        </div>

        {/* Flecha */}
        <div className="hidden md:flex items-center justify-center text-blue-600">
          <ChevronRight size={32} />
        </div>

        {/* Paso 3 */}
        <div className="group p-4 transition-transform transform hover:scale-105 md:col-span-1">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-xl">
            3
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ejecución y Contacto
          </h3>
          <p className="text-gray-600 text-sm">
            Un ingeniero se pondrá en contacto en 24h para coordinar la visita
            en terreno y solucionar el problema.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// 2.6. Contact Section
const ContactSection = () => (
  <section id="contacto" className="py-16 md:py-24 bg-gray-800 text-white">
       {" "}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
           {" "}
      <div>
               {" "}
        <h2 className="text-4xl font-bold mb-4">
                    Inicie su Proyecto con InnoVolt        {" "}
        </h2>
               {" "}
        <p className="text-xl font-light mb-8 text-gray-300">
                    Contáctenos hoy para recibir una cotización o para resolver
          sus dudas           técnicas.        {" "}
        </p>
               {" "}
        <div className="space-y-4">
                   {" "}
          <div className="flex items-start">
                        <Phone className="w-6 h-6 mr-3 text-blue-400 mt-1" />   
                   {" "}
            <div>
                            <p className="font-semibold">Llámenos</p>           
               {" "}
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="text-lg hover:text-blue-400 transition-colors"
              >
                                {PHONE_NUMBER}             {" "}
              </a>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div className="flex items-start">
                        <Mail className="w-6 h-6 mr-3 text-blue-400 mt-1" />   
                   {" "}
            <div>
                            <p className="font-semibold">Envío de Correo</p>   
                       {" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-lg hover:text-blue-400 transition-colors"
              >
                                {EMAIL}             {" "}
              </a>
                         {" "}
            </div>
                     {" "}
          </div>
                   {" "}
          <div className="flex items-start">
                        <MapPin className="w-6 h-6 mr-3 text-blue-400 mt-1" /> 
                     {" "}
            <div>
                            <p className="font-semibold">Oficina Central</p>   
                        <p className="text-lg">{ADDRESS}</p>           {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
            {/* Formulario de Contacto (Placeholder) */}     {" "}
      <div className="bg-white p-8 rounded-xl shadow-2xl">
               {" "}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Solicitar Cotización        {" "}
        </h3>
               {" "}
        <form className="space-y-4">
                   {" "}
          <input
            type="text"
            placeholder="Nombre Completo o Empresa"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
                   {" "}
          <input
            type="email"
            placeholder="Email de Contacto"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
                   {" "}
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
                   {" "}
          <textarea
            placeholder="Describa su Proyecto (Ej: Instalación solar de 10kWp, Mantenimiento de motores, etc.)"
            rows={4}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          ></textarea>
                   {" "}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
                        <Send className="w-5 h-5 mr-2" />            Enviar
            Solicitud          {" "}
          </button>
                 {" "}
        </form>
             {" "}
      </div>
         {" "}
    </div>
     {" "}
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 py-10">
       {" "}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
           {" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 border-b border-gray-700 pb-8">
                {/* Columna 1: Brand */}       {" "}
        <div>
                   {" "}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-500 flex items-center mb-3"
          >
                        <Zap className="w-6 h-6 mr-2" />            InnoVolt    
                 {" "}
          </Link>
                   {" "}
          <p className="text-sm text-gray-400">Ingeniería para el futuro.</p>   
             {" "}
        </div>
                {/* Columna 2: Enlaces Rápidos */}       {" "}
        <div>
                    <h4 className="text-lg font-semibold mb-3">Enlaces</h4>     
             {" "}
          <ul className="space-y-2 text-sm">
                       {" "}
            <li>
                           {" "}
              <Link
                to="/quienes-somos"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Nosotros              {" "}
              </Link>
                         {" "}
            </li>
                       {" "}
            <li>
                           {" "}
              <a
                href="/#contacto"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Contacto              {" "}
              </a>
                         {" "}
            </li>
                       {" "}
            <li>
                           {" "}
              <Link
                to="/servicios/electricas"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Ver Servicios              {" "}
              </Link>
                         {" "}
            </li>
                     {" "}
          </ul>
                 {" "}
        </div>
                {/* Columna 3: Servicios */}       {" "}
        <div>
                   {" "}
          <h4 className="text-lg font-semibold mb-3">Especialidades</h4>       
           {" "}
          <ul className="space-y-2 text-sm">
                       {" "}
            <li>
                           {" "}
              <Link
                to="/servicios/electricas"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Eléctricas              {" "}
              </Link>
                         {" "}
            </li>
                       {" "}
            <li>
                           {" "}
              <Link
                to="/servicios/fotovoltaicas"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Fotovoltaicas              {" "}
              </Link>
                         {" "}
            </li>
                       {" "}
            <li>
                           {" "}
              <Link
                to="/servicios/electromecanicas"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Electromecánicas              {" "}
              </Link>
                         {" "}
            </li>
                     {" "}
          </ul>
                 {" "}
        </div>
                {/* Columna 4: Legal/Social */}       {" "}
        <div>
                   {" "}
          <h4 className="text-lg font-semibold mb-3">Legal y Social</h4>       
           {" "}
          <ul className="space-y-2 text-sm">
                        {/* Legal links (assuming they exist) */}           {" "}
            <li>
                           {" "}
              <a
                href="/politicas-privacidad"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Privacidad              {" "}
              </a>
                         {" "}
            </li>
                       {" "}
            <li>
                           {" "}
              <a
                href="/terminos-condiciones"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                                Términos              {" "}
              </a>
                         {" "}
            </li>
                       {" "}
            <li className="flex space-x-4 mt-2 pt-2 border-t border-gray-700">
                           {" "}
              <a
                href="https://instagram.com/innovolt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                               {" "}
                <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                             {" "}
              </a>
                           {" "}
              <a
                href="https://facebook.com/innovolt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                               {" "}
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                             {" "}
              </a>
                         {" "}
            </li>
                     {" "}
          </ul>
                 {" "}
        </div>
             {" "}
      </div>
           {" "}
      <div className="text-center pt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} InnoVolt Ingeniería. Todos los
        derechos         reservados.      {" "}
      </div>
         {" "}
    </div>
     {" "}
  </footer>
);

// --- 3. COMPONENTE PRINCIPAL DE LA HOME ---
const Home = () => {
  // Se ha eliminado toda la lógica de estado de reservas y carrito.
  // 💡 Hacemos uso del hook de navegación para eliminar la advertencia 6133
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
            <Header />     {" "}
      <main>
                <HeroSection />
        <ProcessSection />
          <KeyServicesSection />   {/* <WhyChooseUsSection />        */}
        <ProductsSection />              <ContactSection />     {" "}
      </main>
            <Footer />    <WhatsappFloat />;
    </div>
  );
};

export default Home;
