const axios = require("axios");

const apiKey = process.env.TELEGRAM_API_KEY;

const sendMessage = async (params) => {
  return await axios.get(`https://api.telegram.org/bot${apiKey}/sendMessage`, { params });
}

const editMessageText =  async (params) => {
  return await axios.get(`https://api.telegram.org/bot${apiKey}/editMessageText`, { params });
}

module.exports = {
  async index(req, res) {
    res.status(200).json([]);
  },

  async store(req, res) {
    const chat_id = req.body.message.chat.id;
    const text = "Oiii";
    // const reply_to_message_id = req.body.message.message_id

    const sentMessage = await sendMessage({ chat_id, text: 'Oi' })
    const sentMessageId = sentMessage.data.result.message_id


    await editMessageText({ chat_id, text: "Oii :D", message_id: sentMessageId })

    res.status(204).send();
  },
};
