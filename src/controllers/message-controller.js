
const apiKey = process.env.TELEGRAM_API_KEY;

const messageController = (req, res) => {
  
  const chatId = req.body.message.chat.id;

  const response = 'Oiii';

  await axios.get(`https://api.telegram.org/bot${apiKey}/sendMessage`, {
    params: { chat_id: chatId, text: response },
  });

  res.status(200).json({ ok: true });
};

module.exports = messageController