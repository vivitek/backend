const amqp = require("amqplib")


let connection = null
let channel = null

const channels = {

}



const createConnection = async() => {
	if (!connection) connection = await amqp.connect(`amqp://${process.env.RABBIT}`)
	return connection
}

/**
 * 
 * @param {String} queue 
 */
const createChannel = async(queue) => {
	if (!channels[queue]) {
		let connection = await createConnection()
		channels[queue] = await connection.createChannel() 
		return channels[queue]
	}
	return channels[queue]
}



/**
 * 
 * @param {String} name
 * @param {Object} channel
 */
const createQueue = async(name) => {
	const channel = await createChannel(name)
	return await channel.assertQueue(name, {durable:true})
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
	let channel = await createChannel(name)
	await createQueue(name)
	return channel
}

const removeChannel = async(name) => {
	await channels[name].close()
	delete channels[name]
}

module.exports = {createConnection, createChannel, createQueue, sendMessage, readQueue, removeChannel}