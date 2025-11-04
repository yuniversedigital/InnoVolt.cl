import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Sun,
  Zap,
  ShoppingCart,
  DollarSign,
  Package,
  GanttChartSquare,
  Wrench,
  Gauge,
  Filter,
  PackageCheck,
  Settings,
} from "lucide-react";
import { useCart } from "./CartContext";

// --- Tipos de Datos y Estructura ---
type AreaServicio =
  | "Eléctricas"
  | "Fotovoltaicas"
  | "Electromecánicas"
  | "Todos";

interface Product {
  id: string;
  title: string;
  area: AreaServicio;
  tag: string;
  imgUrl: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  details: string[];
}

// NOTA: En una aplicación real, esta data se cargaría desde una API.
const ALL_PRODUCTS: Product[] = [
  // --- Kits Fotovoltaicos (2 Kits: Básico y Residencial, tag: "Kit" y "Servicio") ---
  {
    id: "kit-basico-2kw",
    title: "Kit On-Grid Básico",
    area: "Fotovoltaicas",
    tag: "Kit",
    imgUrl: "/src/assets/kit-basico.jpg",
    category: "Proyectos On-Grid",
    description:
      "Solución de autoconsumo para reducir costos en el hogar. Fácil instalación y retorno de inversión rápido.",
    price: 2800000,
    stock: 20,
    details: [
      "Potencia Nominal: 2 kW",
      "Incluye: 4 Paneles 500Wp, Microinversor y kit de montaje.",
      "Ideal para: Consumo diurno promedio.",
    ],
  },
  {
    id: "kit-residencial",
    title: "Instalación Residencial 5kW",
    area: "Fotovoltaicas",
    tag: "Servicio", // Este es un servicio de instalación, por lo que va a la sección Servicios.
    imgUrl: "/src/assets/kit-residencial.jpg",
    category: "Proyectos On-Grid",
    description:
      "Diseño e instalación de un sistema solar fotovoltaico para autoconsumo en hogares, incluyendo trámites y puesta en marcha.",
    price: 4500000,
    stock: 10,
    details: [
      "Incluye: 10 Paneles 500Wp, Inversor 5kW, Estructura y Montaje",
      "Garantía de Instalación: 3 años",
      "Tiempo de Ejecución: 5 días hábiles",
    ],
  },

  // --- Componentes Individuales ADICIONALES (tag: "Producto") ---
  {
    id: "inversor-hibrido",
    title: "Inversor Híbrido 3KW",
    area: "Fotovoltaicas",
    tag: "Producto", // 💡 PRODUCTO INDIVIDUAL
    imgUrl: "/src/assets/inversor-hibrido.jpg",
    category: "Componentes",
    description:
      "Inversor de alta eficiencia que permite inyección a la red y gestión de baterías simultánea.",
    price: 550000,
    stock: 45,
    details: [
      "Potencia: 3 kW",
      "Tecnología: MPPT/Híbrido",
      "Monitoreo: Wi-Fi integrado",
    ],
  },
  {
    id: "bateria-litio",
    title: "Batería de Litio 5kWh",
    area: "Fotovoltaicas",
    tag: "Producto", // 💡 PRODUCTO INDIVIDUAL
    imgUrl: "/src/assets/bateria-litio.jpg",
    category: "Componentes",
    description:
      "Almacenamiento de ciclo profundo, ideal para respaldo y sistemas aislados de alto consumo.",
    price: 950000,
    stock: 25,
    details: ["Capacidad: 5 kWh", "Tipo: LiFePO4", "Ciclos de Vida: >6000"],
  },
  // --- Componente Individual Existente (Fotovoltaicas) ---
  {
    id: "panel-530w",
    title: "Panel Monocristalino Bifacial",
    area: "Fotovoltaicas",
    tag: "Producto", // Tag: Producto (Aparece en Componentes Individuales)
    imgUrl: "/src/assets/panel-530w.jpg",
    category: "Bifacial / Ciclo Alto",
    description:
      "Máxima eficiencia y durabilidad. Captura luz por ambos lados, ideal para grandes proyectos fotovoltaicos.",
    price: 180000,
    stock: 50,
    details: [
      "Tecnología: Monocristalino",
      "Garantía: 12 años producto / 25 años potencia",
      "Certificado: SEC, IEC 61215",
    ],
  },

  // --- Soluciones Eléctricas (Servicio y Producto Individual) ---
  {
    id: "certificacion-te1",
    title: "Certificación TE1 Integral",
    area: "Eléctricas",
    tag: "Servicio", // Tag: Servicio (Aparece en Servicios Técnicos)
    imgUrl: "/src/assets/certificacion-te1.jpg",
    category: "Reglamentación SEC",
    description:
      "Servicio de inspección y certificación de instalaciones eléctricas de baja tensión ante la Superintendencia de Electricidad y Combustibles (SEC).",
    price: 250000,
    stock: 99,
    details: [
      "Incluye: Visita técnica, medición de puesta a tierra y gestión documental.",
      "Válido para: Aumentos de capacidad, instalaciones nuevas y regularizaciones.",
      "Cobertura: Región Metropolitana y V (consultar otras)",
    ],
  },
  {
    id: "tablero-tt",
    title: "Tablero Eléctrico Modular TT",
    area: "Eléctricas",
    tag: "Producto", // Tag: Producto (Aparece en Componentes Individuales)
    imgUrl: "/src/assets/tablero-tt.jpg",
    category: "Componentes",
    description:
      "Tablero de distribución IP65, 12 vías, ideal para ambientes con alta humedad o polvo. Montaje rápido y seguro.",
    price: 85000,
    stock: 30,
    details: [
      "Material: Policarbonato autoextinguible",
      "Protección: IP65",
      "Uso: Residencial, Comercial, Industrial ligero",
    ],
  },

  // --- Soluciones Electromecánicas (Servicios) ---
  {
    id: "mantencion-climatizacion",
    title: "Mantención Preventiva HVAC",
    area: "Electromecánicas",
    tag: "Servicio", // Tag: Servicio (Aparece en Servicios Técnicos)
    imgUrl: "/src/assets/mantencion-hvac.jpg",
    category: "Climatización Industrial",
    description:
      "Programa de mantenimiento preventivo para sistemas de ventilación, calefacción y aire acondicionado (HVAC).",
    price: 150000,
    stock: 99,
    details: [
      "Revisión y limpieza de filtros.",
      "Inspección de compresores y ductos.",
      "Optimización de consumo energético.",
    ],
  },
  {
    id: "automatizacion-bomba",
    title: "Automatización de Sistemas de Bombeo",
    area: "Electromecánicas",
    tag: "Servicio", // Tag: Servicio (Aparece en Servicios Técnicos)
    imgUrl: "/src/assets/bombeo.jpg",
    category: "Control Industrial",
    description:
      "Implementación de sistemas de control para bombas hidráulicas y motobombas, optimizando el flujo y reduciendo fallas.",
    price: 550000,
    stock: 99,
    details: [
      "Incluye: Variador de frecuencia, sensor de presión y controlador PLC básico.",
      "Beneficios: Ahorro energético y vida útil prolongada del equipo.",
      "Aplicación: Aguas servidas, riego agrícola e industria.",
    ],
  },
];
const KITS_PRODUCTS = ALL_PRODUCTS.filter((p) => p.tag === "Kit");
const SERVICIOS_TECNICOS_PRODUCTS = ALL_PRODUCTS.filter(
  (p) => p.tag === "Servicio"
);

// --- Subcomponente: Tarjeta de Producto Detallada ---
interface PanelCardProps {
  product: Product;
}

const ProductCard: React.FC<PanelCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    const item = {
      id: product.id,
      title: product.title,
      optionLabel: product.tag,
      category: product.area,
      price: product.price,
      quantity: 1,
    };

    addToCart(item);

    alert(`✅ ${product.title} añadido a la lista de Cotización.`);
  };

  const getAreaIcon = (area: AreaServicio) => {
    switch (area) {
      case "Eléctricas":
        return <Zap size={20} className="mr-2 text-yellow-400" />;
      case "Fotovoltaicas":
        return <Sun size={20} className="mr-2 text-orange-400" />;
      case "Electromecánicas":
        return <Wrench size={20} className="mr-2 text-red-400" />;
      default:
        return <GanttChartSquare size={20} className="mr-2" />;
    }
  };

  const getAreaColor = (area: AreaServicio) => {
    switch (area) {
      case "Eléctricas":
        return "bg-yellow-600";
      case "Fotovoltaicas":
        return "bg-orange-600";
      case "Electromecánicas":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border-4 border-transparent hover:border-blue-500 transition-all duration-300">
      {/* Imagen */}
      <div className="lg:w-1/4 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.imgUrl}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x200?text=InnoVolt+Image";
          }}
          className="w-full h-auto object-contain max-h-48 lg:max-h-full rounded-lg"
        />
      </div>

      {/* Contenido / Detalles */}
      <div className="lg:w-3/4 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-extrabold text-gray-800 flex items-center">
              {getAreaIcon(product.area)}
              {product.title}
            </h3>
            <span
              className={`text-sm font-semibold text-white ${getAreaColor(
                product.area
              )} px-3 py-1 rounded-full`}
            >
              {product.tag}
            </span>
          </div>
          <p className="text-gray-600 mb-3 text-sm italic">
            Área: {product.area} | Categoría: {product.category}
          </p>
          <p className="text-md text-gray-700 mb-4">{product.description}</p>

          {/* Especificaciones */}
          <ul className="text-sm text-gray-600 list-disc list-inside mb-4 grid grid-cols-1 md:grid-cols-2 gap-1">
            {product.details.map((detail, index) => (
              <li key={index} className="flex items-center">
                <Gauge size={14} className="mr-2 text-blue-500" /> {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer de Compra */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center mt-4">
          <span className="text-3xl font-bold text-green-700 flex items-center mb-4 sm:mb-0">
            <DollarSign size={24} className="mr-1" />
            {product.price.toLocaleString("es-CL")} CLP
          </span>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg shadow-xl transition-colors 
                ${
                  product.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }
            `}
          >
            {product.stock > 0 ? (
              <>
                <ShoppingCart size={20} className="mr-2" />
                Añadir a Cotización
              </>
            ) : (
              <>
                <Package size={20} className="mr-2" />
                Sin Stock
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
// --- FIN Subcomponente: Tarjeta de Producto Detallada ---

// 💡 NUEVO COMPONENTE: Sección dedicada a los Servicios (Mantenido)
const ServiciosTecnicosSection = () => {
  if (SERVICIOS_TECNICOS_PRODUCTS.length === 0) {
    return null;
  }

  return (
    <section
      id="servicios-section"
      className="max-w-7xl mx-auto px-6 space-y-8 mb-20 pt-10 border-t border-gray-300"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <Settings size={36} className="mr-3 text-red-600" />
        Servicios de Ingeniería y Mantenimiento
      </h2>
      <p className="text-xl text-gray-600 text-center mb-10">
        Soluciones rápidas y expertas para certificación, instalación y
        mantenimiento preventivo.
      </p>

      <div className="space-y-8">
        {SERVICIOS_TECNICOS_PRODUCTS.map((product) => (
          // Reutilizamos la tarjeta de producto, ya que incluye el botón de cotización
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// 💡 NUEVO COMPONENTE: Sección dedicada a los Kits (Mantenido)
const KitsSection = () => {
  if (KITS_PRODUCTS.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg">
        <p className="text-xl text-gray-600">
          No hay kits fotovoltaicos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <section
      id="kits-section"
      className="max-w-7xl mx-auto px-6 space-y-8 mb-20 pt-10"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <PackageCheck size={36} className="mr-3 text-green-600" />
        Kits Fotovoltaicos Integrales
      </h2>
      <p className="text-xl text-gray-600 text-center mb-10">
        Soluciones completas On-Grid y Off-Grid para su proyecto de energía
        solar.
      </p>

      <div className="space-y-8">
        {KITS_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// --- Componente de Página Principal (CatalogoGeneralPage) ---
function CatalogoGeneralPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedArea, setSelectedArea] = useState<AreaServicio>("Todos");

  // 💡 CORRECCIÓN 1: Declaramos excludedTags aquí, fuera de los hooks.
  const excludedTags = ["Kit", "Servicio"];

  // 💡 Efecto para scrollear a Kits o Servicios si el hash lo indica
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1); // Elimina el #
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]); // 💡 AJUSTE 2: Usamos excludedTags dentro del useMemo

  const filteredProducts = useMemo(() => {
    if (selectedArea === "Todos") {
      return ALL_PRODUCTS.filter((p) => !excludedTags.includes(p.tag));
    }
    return ALL_PRODUCTS.filter(
      (product) =>
        product.area === selectedArea && !excludedTags.includes(product.tag)
    );
  }, [selectedArea]);

  const areas: AreaServicio[] = [
    "Todos",
    "Eléctricas",
    "Fotovoltaicas",
    "Electromecánicas",
  ];

  return (
    <div className="pt-0 bg-gray-50 min-h-screen">
      {/* Header de la Página */}
      <header className="bg-blue-900 text-white py-2 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-2 flex items-center">
            <GanttChartSquare className="w-12 h-12 mr-3 text-cyan-400" />
            Catálogo General InnoVolt
          </h1>
          <p className="text-xl font-light text-blue-200">
            Explora nuestros productos y servicios de ingeniería profesional.
          </p>
        </div>
      </header>

      {/* 💡 INICIO DE RENDERIZADO DE COMPONENTES INDIVIDUALES (Filtros + Cards) */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        {/* Controles de Filtrado para PRODUCTOS INDIVIDUALES */}
        <section className="mb-8 border-t border-gray-300 pt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Filter size={24} className="mr-2 text-blue-600" /> Componentes
            Individuales
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Explore tableros, inversores y paneles individuales para sus
            proyectos especializados.
          </p>

          {/* 💡 INICIO: BOTONES DE REDIRECCIÓN RÁPIDA */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center sm:justify-start">
            <Link
              to="#servicios-section"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Ir a Servicios
            </Link>
            <Link
              to="#kits-section"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Ir a Kits Fotovoltaicos
            </Link>
          </div>
          {/* 💡 FIN: BOTONES DE REDIRECCIÓN RÁPIDA */}

          <div className="flex flex-wrap gap-4">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 shadow-md ${
                  selectedArea === area
                    ? "bg-blue-600 text-white ring-2 ring-blue-300"
                    : "bg-white text-gray-800 hover:bg-blue-50 border border-gray-300"
                }`}
              >
                {area} (
                {
                  ALL_PRODUCTS.filter(
                    (p) =>
                      (area === "Todos" || p.area === area) &&
                      !excludedTags.includes(p.tag)
                  ).length
                }
                )
              </button>
            ))}
          </div>
        </section>

        {/* Contenedor de Cards para Componentes Individuales */}
        <section className="space-y-8 mb-20">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-xl text-gray-600 py-10">
              No hay productos individuales disponibles en el área seleccionada.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>
      </section>
      {/* 💡 FIN DE RENDERIZADO DE COMPONENTES INDIVIDUALES */}

      {/* INTEGRACIÓN DE LA NUEVA SECCIÓN KITS */}
      <KitsSection />

      {/* INTEGRACIÓN DE LA NUEVA SECCIÓN SERVICIOS */}
      <ServiciosTecnicosSection />

      {/* Botón de Retorno */}
      <div className="py-10 text-center">
        <button
          onClick={() => navigate("/")}
          className="mb-20 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 block mx-auto font-semibold transition duration-300"
        >
          ← Volver al Inicio de InnoVolt
        </button>
      </div>
    </div>
  );
}

export default CatalogoGeneralPage;
