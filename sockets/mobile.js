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
 * @param {SocketIO.Socket} socket
 */
const mobileClientAuthorization = async(data, io, id, socket) => {
	io.in(`/${id}/router`).emit("client authorization", data)
	socket.in(`/${id}/mobile`).send("client added", {address:data.address, banned:data.banned})
	let ban = await banModel.find({routerSet:"1", address:data.address})
	if (ban.length === 0) {
		banModel.create({address:data.address, banned:data.banned, routerSet:id})
	} else {
		ban[0].banned = data.banned
		ban[0].save()
	}
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
		mobileClientAuthorization(data, io, id, socket)
	})
	socket.on("packet allow", (data) => {
		console.log("[+]" + id + " received packet allow request")
		mobileServiceAuthorization(data, io, id);
	})
}



module.exports = entrypoint