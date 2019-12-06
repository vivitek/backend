/**
 * @typedef {Object} RouterData
 * @param {string} address - mac address
 */

/**
 *  handles connection request for a client
 * @param {SocketIO.Server} io 
 * @param {String} id 
 * @param {RouterData} data 
 */
const handleClientConnectionRequest = (io, id, data) => {
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