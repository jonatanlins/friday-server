const axios = require("axios");

const apiKey = process.env.TELEGRAM_API_KEY;

let messages = [];

module.exports = {
  async index(req, res) {
    res.status(200).json(messages);
  },

  async store(req, res) {
    messages.push(req.body);

    // const chatId = req.body.message.chat.id;

    // const response = "Oiii";

    // await axios.get(`https://api.telegram.org/bot${apiKey}/sendMessage`, {
    //   params: { chat_id: chatId, text: response },
    // });

    res.status(200).json({ ok: true });
  },
};
