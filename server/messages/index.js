const amqp = require("amqplib")


let connection = null


const createConnection = async() => {
	if (!connection) connection = await amqp.connect(`amqp://${process.env.RABBIT}`)
	return connection
}

/**
 * 
 * @param {String} queue 
 */
const createChannel = async(queue) => {
		let connection = await createConnection()
		let channel = await connection.createChannel() 
		return channel
}



/**
 * 
 * @param {String} name
 * @param {Object} channel
 */
const createQueue = async(name) => {
	const channel = await createChannel(name)
	const result = await channel.assertQueue(name, {durable:true})
	await channel.close()
	return result
}

/**
 * 
 * @param {String} name 
 * @param {String} message
 * @param {Object} channel
 * @returns {Boolean}
 */
const sendMessage = async(name, message) => {
	await createQueue(name)
	let channel = await createChannel(name)
	return channel.sendToQueue(name, Buffer.from(message), {persistent:true})
}

/**
 * 
 * @param {String} name 
 */
const readQueue = async(name) => {
	await createQueue(name)
	let channel = await createChannel(name)
	return channel
}

const removeChannel = async(channel) => {
	await channel.close()
}

module.exports = {createConnection, createChannel, createQueue, sendMessage, readQueue, removeChannel}