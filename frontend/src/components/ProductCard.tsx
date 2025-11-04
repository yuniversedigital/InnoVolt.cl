import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import { ShoppingCart } from "lucide-react";

// 💡 Interfaz simple para los datos del producto (coincide con ProductosInnoVolt de Home.tsx)
interface ProductOption {
  label: string;
  price: number;
}
interface Product {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType; // Usamos React.ElementType para los iconos de lucide
  options: ProductOption[];
}
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  // 💡 Estado para la opción seleccionada (por defecto la primera)
  const [selectedOption, setSelectedOption] = useState<ProductOption>(
    product.options[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    if (quantity < 1) {
      alert("La cantidad debe ser al menos 1.");
      return;
    }

    const item = {
      id: product.id,
      title: product.title,
      optionLabel: selectedOption.label,
      category: product.category,
      price: selectedOption.price,
      quantity: quantity,
    };

    addToCart(item);

    // Mostrar notificación temporal
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
    setQuantity(1); // Resetear cantidad a 1
  };

  const Icon = product.icon;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col h-full">
      {/* Ícono y Título */}
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
      </div>

      <p className="text-sm text-blue-600 mb-4 font-medium">
        {product.category}
      </p>

      {/* Selector de Opción */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar modelo:
        </label>
        <select
          value={selectedOption.label}
          onChange={(e) => {
            const newOption = product.options.find(
              (opt) => opt.label === e.target.value
            );
            if (newOption) setSelectedOption(newOption);
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {product.options.map((option, index) => (
            <option key={index} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Precio y Cantidad */}
      <div className="flex justify-between items-center mb-4 pt-2 border-t">
        <div>
          <p className="text-sm font-medium text-gray-700">Precio:</p>
          <p className="text-2xl font-extrabold text-green-600">
            ${selectedOption.price.toLocaleString("es-CL")}
            <span className="text-base font-normal text-gray-500"> CLP</span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 p-1 border rounded text-center text-gray-800"
          />
        </div>
      </div>

      {/* Botón Agregar a Cotización */}
      <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors relative"
      >
        <ShoppingCart size={20} className="mr-2" />
        Añadir a Cotización
        {/* Toast de Producto Añadido */}
        {addedToast && (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            ¡Añadido!
          </span>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
