const axios = require("axios");

const apiKey = process.env.TELEGRAM_API_KEY;

const messageController = async (req, res) => {
  const chatId = req.params.message.chat.id;

  const response = "Oiii";

  await axios.get(`https://api.telegram.org/bot${apiKey}/sendMessage`, {
    params: { chat_id: chatId, text: response },
  });

  res.status(200).json({ ok: true });
};

module.exports = messageController;
