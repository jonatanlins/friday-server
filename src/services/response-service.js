const { sendMessage, editMessageText } = require('../services/telegram-service')
const dayjs = require('dayjs')

const responseHandlers = {
	'punch_the_clock': async (message) => {
		const chat_id = message.chat.id;
		const time = message.text.match(/\d\d:\d\d/)?.[0] || dayjs().tz("America/Sao_Paulo").format('HH:mm')

		const sentMessage = await sendMessage({ chat_id, text: 'Tudo bem, estou marcando seu ponto', reply_markup: {
			inline_keyboard: [
				{ text: 'Teste A', callback_data: 'oihon' },
				{ text: 'Teste B', callback_data: 'oihon' },
			]
		} })
		const sentMessageId = sentMessage.data.result.message_id

		await editMessageText({ chat_id, text: `Marquei seu ponto às ${time}`, message_id: sentMessageId })
	},
	'not_understood': async (message) => {
		const chat_id = message.chat.id;
		await sendMessage({ chat_id, text: 'Desculpe, mas não entendi o que você disse 😕' })
	},
}

const getHandlerId = ( text ) => {
	if(text.includes('ponto')) return 'punch_the_clock'
}

const sanitizeMessageText = (text) => {
	return text.trim().toLowerCase()
}

const handleResponse = (message) => {
	const messageText = sanitizeMessageText(message.text)
	const handlerId = getHandlerId(messageText)
	const handler = responseHandlers[handlerId] || responseHandlers.not_understood
	try {
		handler(message)
	} catch {
		responseHandlers.not_understood(message)
	}
}

module.exports = handleResponse
