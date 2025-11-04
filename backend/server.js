// backend/server.js

// 1. Cargar variables de entorno al inicio y depurar su carga
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  const result = dotenv.config();

  if (result.error) {
    console.error("Error al cargar .env:", result.error);
  } else {
    // console.log(".env cargado correctamente. Variables cargadas:", result.parsed);
  }
}
const express = require("express");
const cors = require("cors");
const path = require("path"); // Mantenido por si es necesario para archivos estáticos/producción

const app = express();

// --- Importaciones de Rutas y Controladores ---
// NOTA: Eliminamos la dependencia de 'db' y 'disponibilidadRoutes'
// 💡 Importamos el nuevo controlador de cotización
const cotizacionController = require("./controllers/cotizacionController");
const marketingRoutes = require("./routes/marketing.routes");
const googleAuthRoutes = require("./routes/googleAuth"); // Mantener si usas autenticación Google

// --- Middlewares Globales ---
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend local
      "http://localhost:5174",
      // Añade aquí tus dominios de producción (Ej: "https://www.innovolt.cl")
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Permite a Express leer JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite a Express leer datos codificados en URL

// --- Rutas de la API ---

// 1. Solicitud de Cotización (Reemplaza a Webpay)
// 💡 Endpoint usado por CartIcon.tsx para enviar el formulario de cotización.
app.post("/api/cotizacion/enviar", cotizacionController.enviarCotizacionEmail);

// 2. Rutas de Marketing (mantener si se usa para enviar emails de confirmación)
app.use("/api/marketing", marketingRoutes);

// 3. Rutas de Autenticación (mantener si se usa para inicio de sesión de Staff/Admin)
app.use("/api/auth/google", googleAuthRoutes);

// --- Manejo de Archivos Estáticos (si aplica, para producción) ---
if (process.env.NODE_ENV === "production") {
  // Aquí se servirían los archivos estáticos del frontend si estuviera en el mismo servidor
  // app.use(express.static(path.join(__dirname, 'frontend/dist')));
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  // });
}

// --- Inicio del Servidor ---

const PORT = process.env.PORT || 3000;

// NOTA IMPORTANTE: Si ya no usas Sequelize (como sugiere la eliminación de modelos),
// puedes iniciar el servidor directamente sin la promesa de conexión a la DB.

app.listen(PORT, () => {
  console.log(`Servidor InnoVolt corriendo en http://localhost:${PORT}`);
  console.log(
    "Sistema de pagos Webpay deshabilitado. Usando Cotización por Email."
  );
});

// ⚠️ Eliminamos todo el bloque de db.sequelize.sync().then() ya que los modelos y la DB no son críticos
// para la funcionalidad de cotización por email. Si tienes otros modelos (ej: usuarios, inventario)
// y quieres mantener la DB, debes reintroducir una versión simplificada de la conexión y modelos.

// --- FIN DEL ARCHIVO ---
