const amqp = require("amqplib")

const createConnection = async() => {
	return await amqp.connect("amqp://rabbit")
}

const createChannel = async() => {
	let connection = await createConnection()
	return await connection.createChannel()
}



/**
 * 
 * @param {String} name
 * @param {Object} channel
 */
const createQueue = async(name, channel) => {
	let queue = await channel.assertQueue(name)
}

/**
 * 
 * @param {String} name 
 * @param {String} message
 * @param {Object} channel
 * @returns {Boolean}
 */
const sendMessage = async(name, message, channel) => {
	return channel.sendToQueue(name, Buffer.from(message))
}

module.exports = {createConnection, createChannel, createQueue, sendMessage}