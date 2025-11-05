// src/components/WhatsappFloat.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Sun,
  Car,
  MessageSquare,
  X,
  HelpCircle,
  Send,
} from "lucide-react";

const PHONE_NUMBER = "56912345678";

// --- 1. SIMULATED QA ENGINE DATA ---
const QA_ANSWERS = {
  factura:
    "Nuestra aplicación gestiona la cotización y el agendamiento. La factura oficial se genera **posteriormente** y es enviada por nuestro equipo administrativo a tu correo electrónico, una vez que la cotización del proyecto es aceptada.",
  domicilio:
    "todos nuestros servicios (Eléctricas, Fotovoltaicas y Electromecánicas) incluyen visitas a domicilio o terreno. Para la inspección, te recomendamos usar el menú principal y agendar tu diagnóstico o visita técnica en el área que necesites.",
  servicios:
    "En InnoVolt ofrecemos soluciones integrales. Nuestros 3 servicios principales son: 1. Soluciones Eléctricas (instalaciones y certificación), 2. Sistemas Fotovoltaicos (kits y estudios de viabilidad), y 3. Electromecánica Vehicular (diagnóstico y reparación). Selecciona una de las opciones del menú principal para agendar una visita en el área de tu interés.",

  estudio:
    "El Estudio de Viabilidad Solar (EVS) te garantiza: 1) Un Retorno de Inversión (ROI) optimizado**, 2) Máximo ahorro con dimensionamiento preciso, y 3) Respaldo de ingeniería con cumplimiento normativo. El costo inicial es abonado si contratas la instalación. Te recomendamos agendar una consulta en el menú principal.",
  cotizar:
    "Para cotizar un proyecto, por favor selecciona el área de servicio que te interesa (Eléctricas, Fotovoltaicas, o Electromecánica) y serás redirigido con un mensaje inicial predefinido.",
  sec: "Sí, en InnoVolt realizamos servicios de certificación SEC. Si tu proyecto es menor a 10 kW, podemos firmar la declaración internamente.",
  visita:
    "Las visitas técnicas tienen un costo de $45.000 CLP y este valor es descontable del proyecto final si contratas el servicio.",
  garantia:
    "Nuestras instalaciones cuentan con 3 años de garantía de montaje. Los equipos (paneles/inversores) tienen la garantía directa del fabricante.",
  horario:
    "Nuestro horario de atención telefónica y soporte es de Lunes a Viernes de 9:00 a 18:00 hrs.",
  financiamiento:
    "Actualmente no ofrecemos financiamiento directo, pero podemos asesorarte sobre opciones bancarias o gubernamentales disponibles.",
};

const getAnswer = (question: string): string | null => {
  const lowerQuestion = question.toLowerCase();

  // Check for keywords in the question
  if (lowerQuestion.includes("cotizar") || lowerQuestion.includes("cotizo"))
    return QA_ANSWERS.cotizar;
  if (lowerQuestion.includes("sec") || lowerQuestion.includes("certificado"))
    return QA_ANSWERS.sec;
  if (lowerQuestion.includes("visita") || lowerQuestion.includes("diagnostico"))
    return QA_ANSWERS.visita;
  if (lowerQuestion.includes("garantia") || lowerQuestion.includes("garantía"))
    return QA_ANSWERS.garantia;
  if (
    lowerQuestion.includes("horario") ||
    lowerQuestion.includes("horas") ||
    lowerQuestion.includes("hora")
  )
    return QA_ANSWERS.horario;
  if (
    lowerQuestion.includes("financiamiento") ||
    lowerQuestion.includes("pago")
  )
    return QA_ANSWERS.financiamiento;
  if (
    lowerQuestion.includes("factura") ||
    lowerQuestion.includes("pagar") ||
    lowerQuestion.includes("pago")
  )
    return QA_ANSWERS.factura;
  if (
    lowerQuestion.includes("domicilio") ||
    lowerQuestion.includes("terreno") ||
    lowerQuestion.includes("donde") ||
    lowerQuestion.includes("ubicacion")
  )
    return QA_ANSWERS.domicilio;
  if (
    lowerQuestion.includes("estudio") ||
    lowerQuestion.includes("fotovoltaico") ||
    lowerQuestion.includes("viabilidad")
  )
    return QA_ANSWERS.estudio;
  if (
    lowerQuestion.includes("servicios") ||
    lowerQuestion.includes("cuales") ||
    lowerQuestion.includes("que hacen")
  )
    return QA_ANSWERS.servicios;

  return null;
};
// -----------------------------------

// --- 2. SERVICE OPTIONS (Menu View) ---
const SERVICE_OPTIONS = [
  {
    icon: Zap,
    title: "1. Agendar Visita Eléctrica",
    message:
      "Hola InnoVolt, me gustaría cotizar o solicitar una visita técnica para un proyecto eléctrico (baja tensión/certificación).",
    color: "text-blue-600",
  },
  {
    icon: Sun,
    title: "2. Agendar Estudio Fotovoltaico",
    message:
      "Hola InnoVolt, estoy interesado en un Estudio de Viabilidad Solar o un Kit Fotovoltaico On-Grid.",
    color: "text-yellow-600",
  },
  {
    icon: Car,
    title: "3. Agendar Diagnóstico Vehicular",
    message:
      "Hola InnoVolt, necesito agendar un diagnóstico o cotizar una reparación electromecánica para mi vehículo.",
    color: "text-red-600",
  },
];

// --- 3. FAQ CHATBOT COMPONENT ---
const FAQChatbot: React.FC<{ setView: (view: "menu" | "faq") => void }> = ({
  setView,
}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const foundAnswer = getAnswer(question);

    if (foundAnswer) {
      setAnswer(foundAnswer);
    } else {
      setAnswer(
        `Lo siento, no tengo una respuesta inmediata para "${question}". Por favor, contacta a nuestro equipo por WhatsApp para una consulta especializada.`
      );
    }
  };

  // Función para redirigir a WSP con la pregunta escrita
  const handleRedirectToWSP = () => {
    const message = `Hola InnoVolt, tengo la siguiente consulta concreta: ${
      question.trim() || "Necesito una consulta especializada"
    }`;
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setQuestion("");
    setAnswer("");
    setView("menu"); // Regresa al menú principal (opcional)
  };

  return (
    <div className="p-3 space-y-4">
      <div className="flex justify-start">
        <div className="bg-gray-200 p-2 rounded-lg max-w-[90%] text-sm">
          Escribe tu pregunta sobre cotizaciones, garantías o servicios.
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe aquí tu pregunta..."
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {answer && (
        <div className="bg-white p-3 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="font-semibold text-sm mb-2 text-gray-700">Respuesta:</p>
          <p className="text-sm text-gray-600 mb-3">{answer}</p>

          <button
            onClick={handleRedirectToWSP}
            className="w-full bg-green-500 text-white p-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contactar Equipo con esta Consulta
          </button>
          <button
            onClick={() => setView("menu")}
            className="w-full mt-2 text-xs text-gray-500 hover:text-gray-800"
          >
            ← Volver al Menú de Servicios
          </button>
        </div>
      )}
    </div>
  );
};

// --- 4. MAIN WHATSAPP FLOAT COMPONENT ---

const WhatsappFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"menu" | "faq">("menu"); // 💡 NUEVO ESTADO DE VISTA
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLAnchorElement>(null);

  // Hook para cerrar el panel al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setCurrentView("menu"); // Restablece al menú al cerrar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Función para manejar la selección de servicio y redirigir a WhatsApp
  const handleSelectService = (message: string) => {
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setCurrentView("menu");
  };

  const handleOpenChat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setCurrentView("menu"); // Asegura que empiece siempre en el menú
  };

  // CONTENIDO DEL CHATBOT BASADO EN LA VISTA ACTUAL
  const ChatbotContent = (
    <div className="p-3">
      {/* Mensajes de Bienvenida (Comunes a ambas vistas, para contexto) */}
      <div className="flex justify-start mb-3">
        <div className="bg-gray-200 p-2 rounded-lg max-w-[80%] text-sm">
          ¡Hola! 👋 Soy tu asistente virtual de InnoVolt.
        </div>
      </div>
      <div className="flex justify-start mb-3">
        <div className="bg-gray-200 p-2 rounded-lg max-w-[90%] text-sm">
          ¿Cómo podemos ayudarte?
        </div>
      </div>

      {/* 1. VISTA DE PREGUNTAS FRECUENTES (FAQ) */}
      {currentView === "faq" && <FAQChatbot setView={setCurrentView} />}

      {/* 2. VISTA DE MENÚ PRINCIPAL */}
      {currentView === "menu" && (
        <>
          <p className="text-xs text-gray-500 my-3 text-center">
            Selecciona el tipo de consulta que necesitas:
          </p>
          <div className="space-y-2">
            {/* Botón para abrir el FAQ */}
            <button
              onClick={() => setCurrentView("faq")}
              className={`w-full text-left p-3 flex items-center bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors border border-blue-300 shadow-sm`}
            >
              <HelpCircle
                className={`w-5 h-5 mr-3 text-blue-600 flex-shrink-0`}
              />
              <span className="text-sm font-bold text-blue-800">
                Consultar Preguntas Frecuentes (FAQ)
              </span>
            </button>

            {/* Opciones de Servicio */}
            {SERVICE_OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectService(option.message)}
                className={`w-full text-left p-3 flex items-center bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 shadow-sm`}
              >
                <option.icon
                  className={`w-5 h-5 mr-3 ${option.color} flex-shrink-0`}
                />
                <span className="text-sm font-medium text-gray-700">
                  {option.title}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Panel Chatbot Flotante */}
      {isOpen && (
        <div
          ref={panelRef}
          // Adjusted bottom positioning to accommodate the fixed header on home page if necessary
          className="fixed bottom-24 right-4 z-50 w-72 bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300"
        >
          {/* Encabezado del Chatbot */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-bold">InnoVolt Ingeniería</span>
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentView("menu");
              }}
              className="hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cuerpo del Chatbot - Contenido Dinámico */}
          {ChatbotContent}
        </div>
      )}

      {/* 2. Botón Flotante (Ícono de Activación) */}
      <a
        ref={iconRef}
        onClick={handleOpenChat}
        className="whatsapp-float cursor-pointer"
        aria-label="Abrir opciones de contacto por WhatsApp"
      ></a>
    </>
  );
};

export default WhatsappFloat;
