// Datos de Paneles Solares (Centralizados, puedes mover esto a src/data/productos.ts si lo deseas)

// NOTA: Reemplaza las rutas de las imágenes con tus rutas reales.
const PANEL_PRODUCTS = [
  {
    id: "panel-530w",
    title: "Panel Monocristalino Bifacial",
    wattage: "530W",
    imgUrl: "/assets/panel-530w.jpg", // ⚠️ Reemplazar
    category: "Bifacial / Ciclo Alto",
    description:
      "Máxima eficiencia y durabilidad. Captura luz por ambos lados, ideal para instalaciones comerciales y grandes proyectos fotovoltaicos.",
    price: 180000,
    stock: 50,
  },
  {
    id: "panel-400w",
    title: "Panel Monocristalino Estándar",
    wattage: "400W",
    imgUrl: "/assets/panel-400w.jpg", // ⚠️ Reemplazar
    category: "Residencial / Comercial",
    description:
      "La opción más vendida para techos residenciales y pequeños negocios. Alto rendimiento incluso en condiciones de baja luminosidad.",
    price: 150000,
    stock: 120,
  },
  {
    id: "panel-300w",
    title: "Panel Monocristalino Básico",
    wattage: "300W",
    imgUrl: "/assets/panel-300w.jpg", // ⚠️ Reemplazar
    category: "Usos Generales / Off-Grid",
    description:
      "Solución económica y confiable para sistemas off-grid, bombeo de agua o instalaciones con espacio limitado.",
    price: 120000,
    stock: 80,
  },
];
