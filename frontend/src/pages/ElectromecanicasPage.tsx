import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Zap,
  Sun,
  Wrench,
  ChevronRight,
  CheckCircle,
  Mail,
  Phone,
  Car,
  Clock,
  DollarSign,
  Send,
} from "lucide-react";
import VisitaFormModal from "../components/ReservaConFecha";

// --- TIPADO PARA EL COMPONENTE DE SECCIÓN ---
interface VisitaTecnicaProps {
  setIsModalOpen: (isOpen: boolean) => void;
}
// ------------------------------------------

// --- DATOS DE LA PÁGINA (SERVICIO GENERAL) ---
const pageService = {
  title: "Electromecánica para Vehículos y Transporte",
  icon: Car,
  color: "text-red-600 border-red-600",
  description:
    "Servicios especializados en el diagnóstico, reparación y mantenimiento de los sistemas eléctricos, electrónicos y mecánicos de vehículos livianos, pesados y maquinaria de transporte.",
  benefits: [
    "Diagnóstico y reparación de sistemas de encendido y carga (alternadores/baterías).",
    "Mantenimiento y reparación de motores de partida y sistemas de inyección electrónica.",
    "Reparación de cableados, sistemas de iluminación y unidades de control electrónico (ECU).",
    "Análisis de fallas electrónicas y mecánicas, incluyendo frenos ABS y sistemas de seguridad.",
  ],
  details:
    "Nuestra experticia electromecánica garantiza la eficiencia del motor, la seguridad eléctrica y la vida útil óptima de su flota o vehículo particular, minimizando el tiempo de inactividad.",
  callToAction: "Solicite un Diagnóstico Electrónico Vehicular",
};

// --- DATOS DEL SERVICIO DE VISITA/DIAGNÓSTICO (PARA EL MODAL) ---
const serviceDetails = {
  category: "Electromecánica",
  id: "diagnostico-electromecanico",
  serviceTitle: "Diagnóstico Electrónico/Mecánico Vehicular",
  price: 45000,
  callToAction: pageService.callToAction,
  color: pageService.color,
};

// --- SECCIÓN VISITA TÉCNICA RÁPIDA (con tipado aplicado) ---
const VisitaTecnicaSection: React.FC<VisitaTecnicaProps> = ({
  setIsModalOpen,
}) => (
  <div
    className={`bg-red-50 border-l-4 border-red-600 p-6 rounded-xl shadow-md mb-8 w-full`}
  >
       {" "}
    <h3 className="text-2xl font-extrabold text-red-800 mb-3 flex items-center">
            <Clock className="w-6 h-6 mr-3" />      Diagnóstico en Terreno
      (Servicio Prioritario)    {" "}
    </h3>
       {" "}
    <p className="text-lg text-gray-700 mb-4">
            ¿Necesita un diagnóstico rápido de fallas eléctricas o mecánicas? Un
            especialista se desplazará a su ubicación.    {" "}
    </p>
       {" "}
    <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
           {" "}
      <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-green-600" />       {" "}
        <span className="text-xl font-bold text-gray-900">$45.000 CLP</span>   
         {" "}
      </div>
           {" "}
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 text-md font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
                <Send className="w-5 h-5 mr-2" />        Agendar Diagnóstico    
         {" "}
      </button>
         {" "}
    </div>
       {" "}
    <p className="text-sm text-gray-500 mt-3">
            *Precio solo por el servicio de diagnóstico. El valor es descontable
      del       costo final de la reparación.    {" "}
    </p>
     {" "}
  </div>
);
// ----------------------------------------

const ElectromecanicasPage = () => {
  const navigate = useNavigate();
  const Icon = pageService.icon;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pt-0">
           {" "}
      <header className="bg-gray-800 text-white py-7 mb-8">
               {" "}
        <div className="max-w-6xl mx-auto px-6">
                   {" "}
          <h1 className="text-5xl font-extrabold mb-2 flex items-center">
                       {" "}
            <Icon className={`w-12 h-12 mr-3 ${pageService.color}`} />         
              {pageService.title}         {" "}
          </h1>
                   {" "}
          <p className="text-xl font-light text-gray-300">
                        {pageService.description}         {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </header>
           {" "}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-1">
               {" "}
        {/* 💡 CORRECCIÓN CLAVE: El div lg:col-span-2 debe envolver TODAS las secciones de contenido principal */}
               {" "}
        <div className="lg:col-span-2">
          {/* 👇 Sección de Visita Técnica (1er contenido de la columna principal) */}
          <VisitaTecnicaSection setIsModalOpen={setIsModalOpen} />         {" "}
          {/* 👇 Sección de Características Clave (2do contenido de la columna principal) */}
                   {" "}
          <section
            className={`bg-white p-8 rounded-xl shadow-lg border-t-4 ${pageService.color.replace(
              "text-",
              "border-"
            )} mb-10`}
          >
                       {" "}
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                           {" "}
              <CheckCircle className="w-7 h-7 mr-3 text-green-600" />           
                Características Clave del Servicio            {" "}
            </h2>
                       {" "}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            {pageService.details}           {" "}
            </p>
                       {" "}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg text-gray-600 list-none">
                           {" "}
              {pageService.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                                   {" "}
                  <ChevronRight
                    className={`w-5 h-5 mr-2 mt-1 ${pageService.color}`}
                  />
                                    {benefit}               {" "}
                </li>
              ))}
                         {" "}
            </ul>
                     {" "}
          </section>
                 {" "}
        </div>{" "}
        {/* 💡 CIERRE DEL DIV lg:col-span-2 */}       {" "}
        {/* Columna Lateral (1/3) */}       {" "}
        <aside className="lg:col-span-2">
                    {/* Tarjeta de Contacto Rápido */}         {" "}
          <div
            className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${pageService.color.replace(
              "text-",
              "border-"
            )} mb-6`}
          >
                       {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Contacte a un Especialista            {" "}
            </h3>
                       {" "}
            <p className="text-gray-600 mb-4">
                            {pageService.callToAction} y reciba asesoría
              experta.            {" "}
            </p>
                       {" "}
            <a
              href="mailto:ventas@innovolt.cl"
              className="w-full inline-flex items-center justify-center px-4 py-2 mb-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
                            <Mail className="w-5 h-5 mr-2" />             
              Enviar Solicitud            {" "}
            </a>
                       {" "}
            <a
              href="tel:+56912345678"
              className="w-full inline-flex items-center justify-center px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
                            <Phone className="w-5 h-5 mr-2" />             
              Llamar Ahora            {" "}
            </a>
                     {" "}
          </div>
                   {" "}
          {/* Navegación a Otros Servicios (Manualmente sin array de data) */} 
                 {" "}
          <div className="bg-white p-6 rounded-xl shadow-lg">
                       {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                            Otros Servicios            {" "}
            </h3>
                       {" "}
            <ul className="space-y-2">
                           {" "}
              <li>
                               {" "}
                <Link
                  to="/servicios/electricas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                                    → Soluciones Eléctricas                {" "}
                </Link>
                             {" "}
              </li>
                           {" "}
              <li>
                               {" "}
                <Link
                  to="/servicios/fotovoltaicas"
                  className="block px-3 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                                    → Soluciones Fotovoltaicas                {" "}
                </Link>
                             {" "}
              </li>
                         {" "}
            </ul>
                     {" "}
          </div>
                 {" "}
        </aside>
             {" "}
      </div>
           {" "}
      <div className="py-10 text-center">
               {" "}
        <button
          onClick={() => navigate("/")}
          className="mt-10 mb-20 px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 block mx-auto font-semibold"
        >
                    Volver al Inicio        {" "}
        </button>
             {" "}
      </div>
      {/* 💡 INTEGRACIÓN DEL MODAL AL FINAL DEL COMPONENTE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <VisitaFormModal
            serviceId={serviceDetails.id}
            serviceTitle={serviceDetails.serviceTitle}
            servicePrice={serviceDetails.price}
            serviceCategory={serviceDetails.category}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
         {" "}
    </div>
  );
};

export default ElectromecanicasPage;
