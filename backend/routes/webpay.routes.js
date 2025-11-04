const express = require("express");
const router = express.Router();
const webpayController = require("../controllers/cotizacionController");

// Define la ruta POST para crear una transacción (Nombre actualizado)
router.post("/create-transaction", webpayController.createTransaction);

// Define la ruta GET para confirmar una transacción (Nombre actualizado)
router.post("/confirmacion", webpayController.confirmacion);
router.get("/confirmacion", webpayController.confirmacion); // Transbank puede devolver por POST o GET

// Define la ruta GET para obtener detalles
router.get("/details", webpayController.getPurchaseDetails);

// NOTA: La ruta de visitas está definida en server.js: app.post("/api/visitas", webpayController.handleVisitaTecnica);

// Asegúrate de exportar el router
module.exports = router;
