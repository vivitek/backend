/**
 * send response to router telling him wheter or not to attribute him an ip address
 * @param {Object} data 
 * @param {SocketIO.Server} io 
 * @param {String} id 
 */
const mobileClientAuthorization = (data, io, id) => {
	io.in(`/${id}/router`).emit("client authorization", data)
}

/**
 * 
 * @param {Object} data 
 * @param {SocketIO.Server} io 
 * @param {String} id 
 */
const mobileServiceAuthorization = (data, io, id) => {
	io.in(`/${id}/firewall`).emit("client authorization", data)
}

/**
 * Entrypoint for handling mobile app socket communication
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} io
 * @param {string} id
 */
const entrypoint = (socket, io, id) => {
	console.log(socket.rooms)
	socket.on("client allow", (data) => {
		console.log("[+]" + id + " received client allow request")
		mobileClientAuthorization(data, io, id)
	})
	socket.on("packet allow", (data) => {
		console.log("[+]" + id + " received packet allow request")
		mobileServiceAuthorization(data, io, id);
	})
}



module.exports = entrypoint