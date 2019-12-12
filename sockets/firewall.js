/**
 * @typedef {Object} RouterData
 * @param {string} name- mac address
 * @param {boolean} banned - is the user banned from using the network ?
 */

/**
 *  handles connection request for a client
 * @param {SocketIO.Server} io 
 * @param {String} id 
 * @param {RouterData} data 
 */
const handleClientConnectionRequest = (io, id, data) => {
	io.in(`/${id}/mobile`).emit("service request", data)
}

/**
 * Entrypoint for handling mobile app socket communication
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} io
 * @param {string} id
 */
const entrypoint = (socket, io, id) => {
	socket.on("service request", (data) => {
		handleClientConnectionRequest(io, id, data);
	})
}



module.exports = entrypoint