import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ShoppingCart, DollarSign, Package } from "lucide-react";
// 💡 CORRECCIÓN: Eliminamos importaciones no usadas (Sun, Link, Mail, Phone)
// Asegúrate de que esta ruta a CartContext.tsx sea correcta
// 💡 NOTA: No necesitamos importar ItemCotizacion si no lo usamos para tipar la función directamente.
import { useCart } from "./CartContext";

// --- 1. DATOS ESPECÍFICOS DE INVERSORES ---
// NOTA: Reemplaza las rutas de las imágenes con tus rutas reales.
const INVERSOR_PRODUCTS = [
  {
    id: "onda-pura-1kw",
    title: "Inversor Onda Pura",
    rating: "1KW",
    imgUrl: "/src/assets/inversor-onda-pura.jpg",
    category: "Off-Grid / Aislado",
    description:
      "Proporciona energía limpia y estable, esencial para equipos electrónicos sensibles. Ideal para sistemas solares aislados.",
    price: 250000,
    stock: 75,
    specs: [
      { label: "Potencia Nominal", value: "1,000W" },
      { label: "Tecnología", value: "Onda Sinusoidal Pura" },
      { label: "Eficiencia", value: ">90%" },
      { label: "Garantía", value: "2 Años" },
    ],
  },
  {
    id: "hibrido-3kw",
    title: "Inversor Híbrido Ciclado",
    rating: "3KW",
    imgUrl: "/src/assets/inversor-hibrido.jpg",
    category: "On-Grid / Batería",
    description:
      "Permite la inyección a la red y el almacenamiento en baterías simultáneamente. La solución más flexible para hogares y pequeñas empresas.",
    price: 550000,
    stock: 40,
    specs: [
      { label: "Potencia Nominal", value: "3,000W" },
      { label: "Tecnología", value: "MPPT / Híbrido" },
      { label: "Voltaje de Salida", value: "220V AC" },
      { label: "Monitoreo", value: "Wi-Fi / App" },
    ],
  },
];

// --- 2. Subcomponente: Tarjeta de Producto Detallada ---
interface InversorCardProps {
  product: (typeof INVERSOR_PRODUCTS)[0];
}

const InversorCard: React.FC<InversorCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  // 💡 Eliminamos la declaración de 'navigate' ya que no se usa aquí.

  const handleAddToCart = () => {
    // 💡 CORRECCIÓN: Adaptamos la data para que cumpla con la interfaz ItemCotizacion
    const item = {
      id: product.id,
      title: product.title,
      optionLabel: product.rating, // Usamos la clasificación como opción específica
      category: "Fotovoltaica", // Categoría general del producto
      price: product.price,
      quantity: 1, // Por defecto se añade 1 unidad
    };

    addToCart(item);
    alert(`✅ ${product.title} añadido a la lista de Cotización.`);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
      {/* Imagen */}
      <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
        {/* ⚠️ Nota: Debes asegurar que la URL de la imagen sea accesible en tu entorno. */}
        <img
          src={product.imgUrl}
          alt={product.title}
          className="w-full h-auto object-contain max-h-48 md:max-h-full"
        />
      </div>

      {/* Contenido / Detalles */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-extrabold text-gray-800 flex items-center">
              {product.title}
            </h3>
            <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
              {product.rating}
            </span>
          </div>
          <p className="text-gray-600 mb-3 text-sm italic">
            Categoría: {product.category}
          </p>
          <p className="text-md text-gray-700 mb-4">{product.description}</p>

          {/* Especificaciones */}
          <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
            {product.specs.map((spec, index) => (
              <li key={index}>
                <strong>{spec.label}:</strong> {spec.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer de Compra */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-3xl font-bold text-green-700 flex items-center">
            <DollarSign size={24} className="mr-1" />
            {product.price.toLocaleString("es-CL")} CLP
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg shadow-md transition-colors 
                ${
                  product.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
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

// --- Componente de Página Principal (InversoresPage) ---
function InversoresPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Header de la Página */}
      <header className="bg-gray-800 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-2 flex items-center">
            <Zap className="w-12 h-12 mr-3 text-blue-400" />
            Catálogo de Inversores de Corriente
          </h1>
          <p className="text-xl font-light text-gray-300">
            Convierte la energía solar en potencia útil para tu hogar o
            industria.
          </p>
        </div>
      </header>

      {/* Contenedor de Productos */}
      <section className="max-w-7xl mx-auto px-6 space-y-8 mb-20">
        {INVERSOR_PRODUCTS.map((product) => (
          <InversorCard key={product.id} product={product} />
        ))}
      </section>

      {/* Footer de Navegación */}
      <div className="py-10 text-center">
        <button
          onClick={() => navigate("/servicios/electricas")}
          className="mb-20 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 block mx-auto font-semibold"
        >
          ← Volver a Servicios Eléctricos
        </button>
      </div>
    </div>
  );
}

export default InversoresPage;
