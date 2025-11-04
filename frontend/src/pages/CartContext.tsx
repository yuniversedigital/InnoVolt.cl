import React, { createContext, useContext, useState, ReactNode } from "react";

// 💡 RENOMBRADO: De 'Reserva' a 'ItemCotizacion'
export interface ItemCotizacion {
  // Eliminamos: id, clientBookingId, terapeuta, especialidad, fecha, hora, sesiones, categoria, terapeutaId
  // Estos campos son irrelevantes para una cotización de productos.

  id: string; // ID del producto (ej: 'paneles', 'inversores')
  title: string; // Título del producto (ej: 'Panel Solar')
  optionLabel: string; // Opción seleccionada (ej: 'Panel 530W (Bifacial)')
  category: string;
  price: number;
  quantity: number; // Nuevo campo para la cantidad
}

interface CotizacionContextType {
  cart: ItemCotizacion[];
  addToCart: (item: ItemCotizacion) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  // 💡 Función añadida para incrementar/decrementar la cantidad
  updateQuantity: (index: number, newQuantity: number) => void;
}

// 💡 RENOMBRADO: De 'CartContext' a 'CotizacionContext'
export const CotizacionContext = createContext<CotizacionContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
});

interface CotizacionProviderProps {
  children: ReactNode;
}

// 💡 RENOMBRADO: De 'CartProvider' a 'CotizacionProvider'
export const CotizacionProvider = ({ children }: CotizacionProviderProps) => {
  const [cart, setCart] = useState<ItemCotizacion[]>([]);

  const addToCart = (item: ItemCotizacion) => {
    // 1. Verificar si el item ya existe en el carrito (mismo ID y misma opción)
    const existingIndex = cart.findIndex(
      (i) => i.id === item.id && i.optionLabel === item.optionLabel
    );

    if (existingIndex > -1) {
      // 2. Si existe, crea una copia del array para inmutabilidad
      const updatedCart = [...cart];

      // 3. Actualiza la cantidad del ítem existente
      // 💡 MEJORA: Accedemos directamente al elemento y actualizamos la cantidad
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + item.quantity,
      };

      setCart(updatedCart);
    } else {
      // 4. Si no existe, agrégalo
      setCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const clearCart = () => setCart([]);

  const updateQuantity = (index: number, newQuantity: number) => {
    // 💡 Asegura que la cantidad sea un número positivo
    const validQuantity = Math.max(0, newQuantity);

    setCart(
      (prev) =>
        prev
          .map((item, i) =>
            i === index ? { ...item, quantity: validQuantity } : item
          )
          .filter((item) => item.quantity > 0) // Eliminar si la cantidad es 0
    );
  };

  return (
    <CotizacionContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CotizacionContext.Provider>
  );
};

// 💡 RENOMBRADO: De 'useCart' a 'useCotizacion'
export const useCotizacion = (): CotizacionContextType => {
  const context = useContext(CotizacionContext);
  if (!context)
    throw new Error("useCotizacion must be used within a CotizacionProvider");
  return context;
};

// 💡 EXPORTAMOS EL COMPONENTE COMO CartProvider para no modificar App.tsx (si existe)
// Si bien el nombre interno es CotizacionProvider, mantenemos el alias de exportación
// para minimizar cambios en otros archivos de la app.
export const CartProvider = CotizacionProvider;
export const useCart = useCotizacion; // Y el alias para el hook
