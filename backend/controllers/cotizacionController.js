// backend/controllers/cotizacionController.js

// Importación simplificada: Solo necesitamos la función de envío de email
const { sendEmail } = require("../services/emailService");
require("dotenv").config();

// Constantes de InnoVolt
const INNOVOLT_EMAIL_RECEPTOR =
  process.env.INNOVOLT_EMAIL_RECEPTOR || "ventas.innovolt@gmail.com";

/**
 * @desc Recibe la lista de productos del carrito de cotización del frontend
 * y la información del cliente, luego envía un correo de notificación.
 * @route POST /api/cotizacion/enviar
 * @access Public
 */
const enviarCotizacionEmail = async (req, res) => {
  console.log("\n--- [BACKEND] INICIO: Solicitud de Cotización Recibida ---");

  try {
    // 1. Desestructurar los datos del cuerpo de la solicitud (enviados desde CartIcon.tsx)
    const { clientName, clientEmail, clientPhone, totalAmount, items } =
      req.body;

    // 2. Validación de Datos Mínimos
    if (
      !clientName ||
      !clientEmail ||
      !clientPhone ||
      !items ||
      items.length === 0
    ) {
      console.error("[ERROR] Datos de cotización incompletos.");
      return res.status(400).json({
        error:
          "Faltan datos obligatorios (nombre, email, teléfono o items de cotización).",
      });
    }

    // 3. Generar el contenido HTML del correo
    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #e0e0e0;">${item.Producto} (${item.Opcion})</td>
        <td style="padding: 8px; border: 1px solid #e0e0e0; text-align: center;">${item.Cantidad}</td>
        <td style="padding: 8px; border: 1px solid #e0e0e0; text-align: right;">${item.PrecioUnitario}</td>
        <td style="padding: 8px; border: 1px solid #e0e0e0; text-align: right;">${item.Subtotal}</td>
      </tr>
    `
      )
      .join("");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #1d4ed8;">Nueva Solicitud de Cotización InnoVolt</h2>
        <p>Se ha recibido una nueva solicitud de cotización de un potencial cliente a través de la web.</p>
        
        <h3 style="color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Datos del Cliente</h3>
        <ul>
          <li><strong>Nombre/Empresa:</strong> ${clientName}</li>
          <li><strong>Email:</strong> <a href="mailto:${clientEmail}">${clientEmail}</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:${clientPhone}">${clientPhone}</a></li>
        </ul>

        <h3 style="color: #1d4ed8; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-top: 20px;">Detalle de la Solicitud</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
          <thead>
            <tr style="background-color: #eff6ff;">
              <th style="padding: 10px; border: 1px solid #e0e0e0; text-align: left;">Producto/Servicio</th>
              <th style="padding: 10px; border: 1px solid #e0e0e0; text-align: center;">Cant.</th>
              <th style="padding: 10px; border: 1px solid #e0e0e0; text-align: right;">P. Unitario</th>
              <th style="padding: 10px; border: 1px solid #e0e0e0; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <p style="font-size: 1.2em; font-weight: bold; text-align: right; margin-top: 15px; color: #059669;">
            TOTAL ESTIMADO: $${totalAmount.toLocaleString("es-CL")} CLP
        </p>

        <p style="margin-top: 20px; font-size: 0.9em; color: #6b7280;">
          Por favor, contacte al cliente para confirmar la cotización y coordinar los detalles.
        </p>
      </div>
    `;

    // 4. Enviar el correo electrónico de notificación a InnoVolt
    const subject = `COTIZACIÓN WEB: Solicitud de ${clientName}`;

    // Asumimos que sendEmail es un servicio que toma (to, subject, html)
    await sendEmail(INNOVOLT_EMAIL_RECEPTOR, subject, htmlContent);

    console.log(
      `[INFO] Cotización enviada con éxito a ${INNOVOLT_EMAIL_RECEPTOR} desde ${clientEmail}.`
    );

    // 5. Respuesta al cliente (frontend)
    return res.status(200).json({
      mensaje: "Solicitud de cotización recibida y enviada al equipo InnoVolt.",
      success: true,
    });
  } catch (error) {
    console.error(
      "[ERROR] Error al procesar la solicitud de cotización:",
      error
    );
    res.status(500).json({
      error: "Error interno del servidor al enviar la cotización.",
    });
  }
};

// 💡 Exportamos solo la nueva función de cotización
module.exports = {
  enviarCotizacionEmail,
  // NOTA: Se eliminan crearTransaccionInicial, confirmarTransaccion, crearReservaDirecta, getPurchaseDetails
};
