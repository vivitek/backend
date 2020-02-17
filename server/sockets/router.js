const broker = require("../messages/index")

/**
 * @typedef {Object} RouterData
 * @param {string} address- mac address
 * @param {boolean} banned - is the user banned from using the network ?
 */

/**
 *  handles connection request for a client
 * @param {SocketIO.Server} io 
 * @param {String} id 
 * @param {RouterData} data 
 */
const handleClientConnectionRequest = async(io, id, data) => {
	const channel = await broker.createChannel()
	let queue = await broker.createQueue(`router${id}`, channel)
	await broker.sendMessage(`router${id}`, JSON.stringify(data), channel)
	io.in(`/${id}/mobile`).emit("connection request", data)
}

/**
 * Entrypoint for handling mobile app socket communication
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} io
 * @param {string} id
 */
const entrypoint = (socket, io, id) => {
	socket.on("connection request", (data) => {
		handleClientConnectionRequest(io, id, data);
	})
}



module.exports = entrypoint