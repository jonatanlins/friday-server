const axios = require("axios");

const apiKey = process.env.TELEGRAM_API_KEY;

const sendMessage = async (params) => {
  return await axios.get(`https://api.telegram.org/bot${apiKey}/sendMessage`, { params });
}

const editMessageText =  async (params) => {
  return await axios.get(`https://api.telegram.org/bot${apiKey}/editMessageText`, { params });
}

module.exports = {
  sendMessage,
  editMessageText
}