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
	await broker.sendMessage(`router${id}`, JSON.stringify(data))
	console.log("message sent")
}

/**
 * Entrypoint for handling mobile app socket communication
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} io
 * @param {string} id
 */
const entrypoint = async(socket, io, id) => {


	socket.on("connection request", (data) => {
		handleClientConnectionRequest(io, id, data);
	})
}



module.exports = entrypoint