const banModel = require("../models/Ban")
/**
 *  @typedef {Object} DataRouter
 *  @property {string} address - MAC address
 *  @property {boolean} banned - whether or not to authorize the address
 */

/**
 * @typedef {Object} DataFirewall
 * @property {string} service - name of the service
 * @property {string} banned - whether or not to authorize the service
 */

/**
 * send response to router telling him wheter or not to attribute him an ip address
 * @param {DataRouter} data 
 * @param {SocketIO.Server} io 
 * @param {String} id 
 */
const mobileClientAuthorization = (data, io, id) => {
	io.in(`/${id}/router`).emit("client authorization", data)
	banModel.create(data)
}

/**
 * 
 * @param {DataFirewall} data 
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