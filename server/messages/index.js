const amqp = require("amqplib")

const connection = await amqp.connect("amqp://yrltntfe:2Fj4C8...@stingray.rmq.cloudamqp.com/yrltntfe")

const channel = await connection.createChannel()

/**
 * 
 * @param {String} name 
 */
const createQueue = async(name) => {
	let queue = await channel.assertQueue(name)
}

/**
 * 
 * @param {String} name 
 * @param {String} message 
 * @returns {Boolean}
 */
const sendMessage = async(name, message) => {
	return channel.sendToQueue(name, Buffer.from(message))
}