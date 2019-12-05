const socketType = require("../socketType")


const entrySocket = (socket) => {
	console.log(`[+] new socket connection`)
	socket.emit("message", "hello world")
	socket.on("id", ({id, type}) => {
		switch(type) {
			case socketType.MOBILE:
				socket.join(`/${id}/mobile`)
				console.log(`[+] mobile connected for id ${id}`)
				socket.emit("assigned", {room:`/${id}/mobile`})
				break
			case socketType.ROUTER:
				socket.join(`/${id}/router`)
				console.log(`[+] router connected for id ${id}`)
				socket.emit("assigned", {room:`/${id}/router`})
				break
			case socketType.FIREWALL:
				socket.join(`/${id}/firewall`)
				console.log(`[+] firewall connected for id ${id}`)
				socket.emit("assigned", {room:`/${id}/firewall`})
				break
		}
	})
}

module.exports = entrySocket