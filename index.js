require('dotenv').config();  // Load .env

const { Telegraf } = require('telegraf');
const QRCode = require('qrcode');

// Ambil token bot dari .env
const bot = new Telegraf(process.env.BOT_TOKEN);

// Kirim instruksi saat bot pertama kali dijalankan
bot.start((ctx) => {
  ctx.reply(
    'Halo! Saya adalah bot yang bisa membuat QR Code dari link yang kamu kirim.\n\n' +
    'Cara menggunakan:\n' +
    '1. Kirimkan link (misal: https://www.google.com)\n' +
    '2. Saya akan mengirimkan QR Code untuk link tersebut.'
  );
});

// Handle pesan yang masuk
bot.on('text', (ctx) => {
  const link = ctx.message.text;

  // Generate QR code dalam bentuk buffer
  QRCode.toBuffer(link, (err, buffer) => {
    if (err) {
      ctx.reply('Terjadi kesalahan saat membuat QR code!');
      return;
    }

    // Kirim QR code dalam bentuk buffer
    ctx.replyWithPhoto({ source: buffer });
  });
});

// Jalankan bot
bot.launch();
