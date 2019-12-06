const socketType = require("../socketType")
const mobileEntry = require("./mobile")

/**
 * assigns a socket to a room and then handles it accordingly
 * @param {SocketIO.Socket} socket 
 * @param {SocketIO.Server} io 
 */
const entrySocket = (socket, io) => {
	console.log(`[+] new socket connection`)
	socket.emit("message", "hello world")
	socket.on("id", ({id, type}) => {
		switch(type) {
			case socketType.MOBILE:
				socket = socket.join(`/${id}/mobile`, (err) => {
					if (err) {
						console.log("[-] mobile socket error: " + err)
					}
					console.log(`[+] mobile connected for id ${id}`)
					socket.emit("assigned", {room:`/${id}/mobile`})
					mobileEntry(socket, io, id);
				})
				break
			case socketType.ROUTER:
				socket.join(`/${id}/router`, (err) => {
					if (err) {
						console.log("[-] router socket error: " + err)
					}
					console.log(`[+] router connected for id ${id}`)
					socket.emit("assigned", {room:`/${id}/router`})
				})
				break
			case socketType.FIREWALL:
				socket.join(`/${id}/firewall`, (err) => {
					if (err) {
						console.log("[-] firewall socket error: " + err)
					}
					console.log(`[+] firewall connected for id ${id}`)
					socket.emit("assigned", {room:`/${id}/firewall`})
				})
				break
		}
	})
}

module.exports = entrySocket